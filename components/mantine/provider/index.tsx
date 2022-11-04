'use client'
import { MantineProvider } from '@mantine/core';
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

export function Providers({children}: { children: React.ReactNode }) {
	const getLibrary = (provider: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc) => {
		const library = new ethers.providers.Web3Provider(provider);
		library.pollingInterval = 8000; // frequency provider is polling
		return library;
	};
	return (
            <MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: 'light',
				}}
			>
				<Web3ReactProvider getLibrary={getLibrary}>
					{children}
				</Web3ReactProvider>
			</MantineProvider>
    )
}