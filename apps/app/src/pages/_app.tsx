import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useGraphQLClient, ClientContext } from 'graphql-helper'

export default function App({ Component, pageProps }: AppProps) {
    const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState)
    return (
        <ClientContext.Provider value={graphQLClient}>
            <Component {...pageProps} />
        </ClientContext.Provider>
    )
}
