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

  const startSession = async(hash, email, name) => {
    const checkIfUserExists = await getUser(hash);
    if (!checkIfUserExists.data) {
      const create = await createUser(hash, email, name);
      console.log("Created user", create);
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

    getUserInfo(session ? MD5(session.user.email).toString(encoder) : '');
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
            {session && <div>Welcome to the Dashboard, {session.user ? session.user.name.split(" ")[0] : ''} 🚀</div>}
            {!session && <div>Please login with Google above ☝</div>}
      </main>

    </div>
  )
}
