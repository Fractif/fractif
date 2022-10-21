import Link from 'next/link'
import Layout from '@components/Layout'
import SelectWalletModal from '@components/wallet/modalConnect'


const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <SelectWalletModal />
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
