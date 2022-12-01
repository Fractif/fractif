import { Html, Head, Main, NextScript } from 'next/document'
import { FractifUiTheme } from 'fractif-ui'
import { MantineProvider } from '@mantine/core'

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <MantineProvider
                // theme import from fractif-ui causes error in _document.tsx, check:
                // @link https://github.com/Fractif/fractif/issues/55
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                theme={FractifUiTheme}
            >
                <body>
                    <Main />
                    <NextScript />
                </body>
            </MantineProvider>
        </Html>
    )
}
