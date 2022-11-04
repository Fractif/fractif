import Link from 'next/link'

export default function LandingPage() {
    return (
        <div>
            <h1>My page</h1>
            <Link href="/about">
                About
            </Link>
        </div>
    )
}