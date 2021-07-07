import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'

export default function Success() {
    return (
        <>
            <Head>
                <title>CryptoTrader</title>
                <meta name="description" content="View prices and trade cryptocurrencies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="mt-16 flex flex-col text-lg items-center">
                <p className="font-semibold text-gray-800">Transaction successful!</p>
                <Link href="/portfolio">
                    <p className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer">Back to Portfolio</p>
                </Link>
                
            </div>
        </>
    )
}