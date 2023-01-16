'use client'
import { MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { NotificationsProvider } from '@mantine/notifications';

//Fractif-ui 
//TODO: Disable fouc with theme loading
import { FractifUiTheme } from "fractif-ui"

//Components
import Navbar from '@components/navbar/index';
import Footer from '@components/footer/index';

export default function App(props: AppProps) {
    const { Component, pageProps } = props;
    return (
        <>
            <Head>
                <title>fractif. - Invest in fraction of luxury goods</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                //TODO: find fix for FractifUiTheme
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                theme={FractifUiTheme}
            >
                <NotificationsProvider>
                    <Navbar />
                    <Component {...pageProps} />
                    <Footer />
                </NotificationsProvider>
            </MantineProvider>
        </>
    );
}
