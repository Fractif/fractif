'use client'
import { MantineProvider } from '@mantine/core';
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { AppProps } from 'next/app';
import Head from 'next/head';
import { NotificationsProvider } from '@mantine/notifications';

//Fractif-ui 
import { FractifUiTheme } from "fractif-ui"

//Components
import Navbar from '@components/navbar/index';
import Footer from '@components/footer/index';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const getLibrary = (provider: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  };
  return (
    <>
      <Head>
        <title>Page title</title>
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
          <Web3ReactProvider getLibrary={getLibrary}>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </Web3ReactProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
