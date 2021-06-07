import Head from 'next/head'
import Header from '../../components/Header'
import * as React from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function Coin() {
    const [ session, loading ] = useSession();
    const router = useRouter();

    const { coin } = router.query;

    return (
        <div>
            <Head>
                <title>CryptoTrader</title>
                <meta name="description" content="View prices and trade cryptocurrencies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header/>
            <main className="m-8 flex font-semibold text-lg text-gray-800 justify-center">
                <p>Here's some info about {coin} 💰</p>
            </main>

        </div>
    
    )
}