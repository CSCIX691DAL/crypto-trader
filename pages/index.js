import Head from 'next/head'
import Header from '../components/Header'
import * as React from 'react'
import { getUser } from '../services/user'

export default function Home() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {

    const getUserInfo = async() => {
      // the userId is hard coded for now...
      const res = await getUser('Z4ve1jKNCTxdTUNfeAHR');
      setUser(res);
    }

    getUserInfo();
  }, []);

  return (
    <div>
      <Head>
        <title>CryptoTrader</title>
        <meta name="description" content="View prices and trade cryptocurrencies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <main className="m-8 flex font-semibold text-lg text-gray-800 justify-center">
            Welcome to the Dashboard, {user ? user.name : ''} 🚀
      </main>

    </div>
  )
}
