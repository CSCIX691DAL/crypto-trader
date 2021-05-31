import Head from 'next/head'
import Header from '../components/Header'
import * as React from 'react'
import { getUser, createUser } from '../services/user'
import MD5 from 'crypto-js/md5'
import encoder from 'crypto-js/enc-hex'
import { useSession } from 'next-auth/client'

export default function Home() {
  const [user, setUser] = React.useState();
  const [ session, loading ] = useSession();

  console.log("BLANK: ", MD5('').toString(encoder));

  const startSession = async(hash, email, name) => {
    const checkIfUserExists = await getUser(hash);
    if (checkIfUserExists.status === 400) {
      const create = await createUser(hash, email, name);
    }
  }

  if (session) {
    let hash = MD5(session.user.email).toString(encoder);
    startSession(hash, session.user.email, session.user.name);
  }
  
  React.useEffect(() => {

    const getUserInfo = async(email) => {
      let hash = MD5(email).toString(encoder);
      const res = await getUser(hash);
      setUser(res.data);
    }

    getUserInfo(session ? session.user.email : '');
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
