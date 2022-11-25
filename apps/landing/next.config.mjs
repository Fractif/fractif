// @ts-check

import { readFileSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import withBundleAnalyzer from '@next/bundle-analyzer';

import { createSecureHeaders } from 'next-secure-headers';
import withNextTranspileModules from 'next-transpile-modules';
import pc from 'picocolors';

const workspaceRoot = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    '..',
    '..'
);
import packageJson from './package.json' assert { type: 'json' };

const trueEnv = ['true', '1', 'yes'];

const isProd = process.env.NODE_ENV === 'production';
const isCI = trueEnv.includes(process.env?.CI ?? 'false');
const enableCSP = true;

const NEXTJS_IGNORE_ESLINT = trueEnv.includes(
    process.env?.NEXTJS_IGNORE_ESLINT ?? 'false'
);
const NEXTJS_IGNORE_TYPECHECK = trueEnv.includes(
    process.env?.NEXTJS_IGNORE_TYPECHECK ?? 'false'
);

/**
 * A way to allow CI optimization when the build done there is not used
 * to deliver an image or deploy the files.
 * @link https://nextjs.org/docs/advanced-features/source-maps
 */
const disableSourceMaps = trueEnv.includes(
    process.env?.NEXT_DISABLE_SOURCEMAPS ?? 'false'
);

if (disableSourceMaps) {
    console.log(
        `${pc.green(
            'notice'
        )}- Sourcemaps generation have been disabled through NEXT_DISABLE_SOURCEMAPS`
    );
}

// Tell webpack to compile those packages
// @link https://www.npmjs.com/package/next-transpile-modules
const tmModules = [
    // for legacy browsers support (only in prod)
    ...(isProd
        ? [
            // modules here
        ]
        : []),
    // ESM only packages are not yet supported by NextJs if you're not
    // using experimental esmExternals
    // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
    // @link {https://github.com/vercel/next.js/discussions/27876|Discussion}
    // @link https://github.com/vercel/next.js/issues/23725
    // @link https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
    ...[
        // ie: newer versions of https://github.com/sindresorhus packages
    ],
];

// @link https://github.com/jagaapple/next-secure-headers
const secureHeaders = createSecureHeaders({
    contentSecurityPolicy: {
        directives: enableCSP
            ? {
                defaultSrc: "'self'",
                styleSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    'https://unpkg.com/@graphql-yoga/graphiql/dist/style.css',
                    'https://meet.jitsi.si',
                    'https://8x8.vc',
                ],
                scriptSrc: [
                    "'self'",
                    "'unsafe-eval'",
                    "'unsafe-inline'",
                    'https://unpkg.com/@graphql-yoga/graphiql',
                    // 'https://meet.jit.si/external_api.js',
                    // 'https://8x8.vc/external_api.js',
                ],
                frameSrc: [
                    "'self'",
                    // 'https://meet.jit.si',
                    // 'https://8x8.vc',
                ],
                connectSrc: [
                    "'self'",
                    'https://vitals.vercel-insights.com',
                    // 'wss://ws.pusherapp.com',
                    // 'wss://ws-eu.pusher.com',
                    // 'https://sockjs.pusher.com',
                    // 'https://sockjs-eu.pusher.com',
                ],
                imgSrc: ["'self'", 'https:', 'http:', 'data:'],
                workerSrc: ['blob:'],
            }
            : {},
    },
    ...(enableCSP && process.env.NODE_ENV === 'production'
        ? {
            forceHTTPSRedirect: [
                true,
                { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true },
            ],
        }
        : {}),
    referrerPolicy: 'same-origin',
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: !disableSourceMaps,
    optimizeFonts: true,

    httpAgentOptions: {
        // @link https://nextjs.org/blog/next-11-1#builds--data-fetching
        keepAlive: true,
    },

    onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: (isCI ? 3600 : 25) * 1000,
    },

    // @link https://nextjs.org/docs/advanced-features/compiler#minification
    // Sometimes buggy so enable/disable when debugging.
    swcMinify: true,

    compiler: {
        // emotion: true,
    },

    // Standalone build
    // @link https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental
    output: 'standalone',


    // @link https://nextjs.org/docs/basic-features/image-optimization
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        formats: ['image/webp'],
        loader: 'default',
        dangerouslyAllowSVG: false,
        disableStaticImages: false,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
        unoptimized: false,
    },

    experimental: {
        // @link https://nextjs.org/docs/advanced-features/output-file-tracing#caveats
        outputFileTracingRoot: workspaceRoot,

        // Prefer loading of ES Modules over CommonJS
        // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
        // @link {https://github.com/vercel/next.js/discussions/27876|Discussion}
        esmExternals: true,
        // Experimental monorepo support
        // @link {https://github.com/vercel/next.js/pull/22867|Original PR}
        // @link {https://github.com/vercel/next.js/discussions/26420|Discussion}
        externalDir: true,
    },

    typescript: {
        ignoreBuildErrors: NEXTJS_IGNORE_TYPECHECK,
    },

    eslint: {
        ignoreDuringBuilds: NEXTJS_IGNORE_ESLINT,
        // dirs: [`${__dirname}/src`],
    },

    async headers() {
        return [
            {
                // All page routes, not the api ones
                source: '/:path((?!api).*)*',
                headers: [
                    ...secureHeaders,
                    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
                    { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
                ],
            },
        ];
    },

    // @link https://nextjs.org/docs/api-reference/next.config.js/rewrites
    async rewrites() {
        return [
            /*
            {
              source: `/about-us`,
              destination: '/about',
            },
            */
        ];
    },

    webpack: (config, { webpack, isServer }) => {
        if (!isServer) {
            // Fixes npm packages that depend on `fs` module
            // @link https://github.com/vercel/next.js/issues/36514#issuecomment-1112074589
            config.resolve.fallback = { ...config.resolve.fallback, fs: false };
        }

        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.(js|ts)x?$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    // https://react-svgr.com/docs/webpack/#passing-options
                    options: {
                        svgo: true,
                        // @link https://github.com/svg/svgo#configuration
                        svgoConfig: {
                            multipass: false,
                            datauri: 'base64',
                            js2svg: {
                                indent: 2,
                                pretty: false,
                            },
                        },
                    },
                },
            ],
        });

        return config;
    },
    env: {
        APP_NAME: packageJson.name ?? 'not-in-package.json',
        APP_VERSION: packageJson.version ?? 'not-in-package.json',
        BUILD_TIME: new Date().toISOString(),
    },
};

let config = nextConfig;

if (tmModules.length > 0) {
    console.info(
        `${pc.green('notice')}- Will transpile [${tmModules.join(',')}]`
    );

    config = withNextTranspileModules(tmModules, {
        resolveSymlinks: true,
        debug: false,
    })(config);
}

if (process.env.ANALYZE === 'true') {
    config = withBundleAnalyzer({
        enabled: true,
    })(config);
}

export default config;