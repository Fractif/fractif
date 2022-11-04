import Head from 'next/head'
import { Providers } from '@components/mantine/provider'
import Navbar from '@components/navbar'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
            <Providers>
                <Navbar />
                {children}
            </Providers>
        </body>
        </html>
    );
}