import Link from 'next/link'

//Import landing page components
import Hero from '@components/landingpage/hero'
import Features from '@components/landingpage/features'

export default function LandingPage() {
    return (
        <>
            <Hero />
            <Features />
        </>
    )
}