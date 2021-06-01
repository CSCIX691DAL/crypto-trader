import Head from 'next/head'
import Header from '../components/Header'
import { useSession } from 'next-auth/client'

export default function Convert() {
    const [ session, loading ] = useSession();

    return (
        <div>
          <Head>
            <title>CryptoTrader</title>
            <meta name="description" content="View prices and trade cryptocurrencies" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <Header/>
          <main className="m-8 flex font-semibold text-lg text-gray-800 justify-center">
            {session ? 
              (<div>This is where you convert currencies, {session.user ? session.user.name.split(" ")[0] : ''} 🏧</div>) : 
              (<div>Please login with Google above ☝</div>)
            }
          </main>
    
        </div>
    )
}