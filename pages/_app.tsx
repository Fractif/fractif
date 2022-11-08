'use client'
import { MantineProvider } from '@mantine/core';
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

import { AppProps } from 'next/app';
import Head from 'next/head';

import Navbar from '@components/navbar';

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
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          colors: {
            brand: [
              "#f4f8fd",
              "#d3e1f7",
              "#adc7ef",
              "#7ea7e6",
              "#0657CF",
              "#3e7cda",
              "#1c65d3",
              "#054dba",
              "#05429e",
              "#033073"
            ],
          },
          primaryColor: 'brand',
          components: {
            Container: {
              defaultProps: {
                p: 48,
                sizes: {
                  xs: "540px",
                  sm: "720px",
                  md: "1260px",
                  lg: "1140px",
                  xl: "1320px",
                },
              },
            },
          },
        }}
      >
        <Web3ReactProvider getLibrary={getLibrary}>
          <Navbar />
          <Component {...pageProps} />
        </Web3ReactProvider>
      </MantineProvider>
    </>
  );
}

