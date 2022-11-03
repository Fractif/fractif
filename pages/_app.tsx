import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";


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
					primaryColor: 'blue',
					radius: {
						sm: 4,
						md: 10,
						lg: 12,
						xl: 16,
					}
				}}
			>
				<Web3ReactProvider getLibrary={getLibrary}>
					<Component {...pageProps} />
				</Web3ReactProvider>
			</MantineProvider>
		</>
	);
}