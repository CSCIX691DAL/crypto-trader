import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>CryptoTrader</title>
        <meta name="description" content="View prices and trade cryptocurrencies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <main className="m-8 flex font-semibold text-lg text-gray-800 justify-center">
            Welcome to the Dashboard 🚀
      </main>

    </div>
  )
}
