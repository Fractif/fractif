import '../styles/globals.css'
import { useGraphQLClient, ClientContext } from 'graphql-helper'
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState)
    // TODO: This type error should be fixed in the next versions of React
    // https://github.com/facebook/react/issues/24304
    const ComponentReplacement = Component as any 
    return (
        <ClientContext.Provider value={graphQLClient}>
            <ComponentReplacement {...pageProps} />
        </ClientContext.Provider>
    )
}
