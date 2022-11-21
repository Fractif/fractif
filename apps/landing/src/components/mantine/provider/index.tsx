'use client'
import { MantineProvider } from '@mantine/core';
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

export function Providers({ children }: { children: React.ReactNode }) {
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
                            sizes: {
                                xs: 540,
                                sm: 720,
                                md: 960,
                                lg: 1140,
                                xl: 1320,
                            },
                        },
                    },
                },
            }}
        >
            <Web3ReactProvider getLibrary={getLibrary}>
                {children}
            </Web3ReactProvider>
        </MantineProvider>
    )
}