import '../styles/globals.css'
import { useGraphQLClient, ClientContext } from 'graphql-helper'
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState)
    return (
        <ClientContext.Provider value={graphQLClient}>
            <Component {...pageProps} />
        </ClientContext.Provider>
    )
}
