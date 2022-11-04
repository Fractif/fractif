import Head from 'next/head'
import { Providers } from '@components/mantine/provider'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <Head>
            <title>Page title</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <body>
            <Providers>
                {children}
            </Providers>
        </body>
        </html>
    );
}