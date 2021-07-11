import Head from 'next/head'
import Header from '../components/Header'
import * as React from 'react'
import { getUser, createUser } from '../services/user'
import { getDashboardInfo } from '../services/coins'
import MD5 from 'crypto-js/md5'
import encoder from 'crypto-js/enc-hex'
import { useSession } from 'next-auth/client'
import DashboardTableItem from '../components/DashboardTable/DashboardTableItem.js'

/**
 * Dashboard page - displays information about the top 20 cryptocurrencies
 * 
 * Uses information from CoinGecko
 */
export default function Home() {

    const [user, setUser] = React.useState();
    const [session, loading] = useSession();
    const [search, setSearch] = React.useState("");

    const dt = new Date();
    var fetchdate = dt.toLocaleString();



    const startSession = async (hash, email, name) => {
        const checkIfUserExists = await getUser(hash);
        if (!checkIfUserExists.data) {
            await createUser(hash, email, name, "");
        }
    }

    if (session) {
        let hash = MD5(session.user.email).toString(encoder);
        startSession(hash, session.user.email, session.user.name);
    }

    // get user info from Firebase
    React.useEffect(() => {
        const getUserInfo = async (email) => {
            let hash = MD5(email).toString(encoder);
            const res = await getUser(hash);
            setUser(res.data);
        }

        getUserInfo(session ? MD5(session.user.email).toString(encoder) : '');
    }, []);


    // grab coin details/pics from CoinGecko
    const [coins, setCoins] = React.useState([]);
    React.useEffect(() => {
        const getCoinInfo = async () => {
            const data = await getDashboardInfo(50);
            setCoins(data);
        }
        getCoinInfo();
    }, []);

    return (
        <div>
            <Head>
                <title>CryptoTrader</title>
                <meta name="description" content="View prices and trade cryptocurrencies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="w-full h-full mt-0">
                <Header />
            </header>

            <div className="h-24" />

            <main>
                <div className="m-8 flex font-semibold text-lg text-gray-800 justify-center">
                    {session ?
                        (<div>Welcome to the Dashboard, {session.user.name.split(" ")[0]} 🚀</div>) :
                        (<div>Please login with Google above ☝</div>)
                    }
                </div>
            </main>


            <div className="m-8 flex flex-col font-normal text-base text-gray-800">
                <div className="m-auto w-6/12 py-2 sticky top-16">
                    <div className="flex bg-blue-200 p-2 border border-blue-300">

                        <div className="flex font-bold text-2xl m-auto py-1 w-1/12 pl-1">
                            Coins
                        </div>
                        <div className="ml-2 py-2 w-7/12">
                            <span className="text-sm">As of {fetchdate}</span>
                        </div>

                        <input className="border-2 border-gray-300 bg-white h-10 px-1 rounded-lg text-sm focus:outline-none w-1/3"
                            type="search" name="search" placeholder="Search" onChange={e => setSearch(e.currentTarget.value)} />
                    </div>
                </div>

                <table className="m-auto w-11/12 md:w-1/2">
                    {coins.filter(coin => {
                        if (search === "") {
                            return coin;
                        } else if (coin.name.toLowerCase().includes(search.toLocaleLowerCase())) {
                            return coin;
                        } else {
                            return false;
                        }
                    }).map((coin, index) => {
                        return <DashboardTableItem coin={coin} key={index} />
                    })}
                </table>
            </div>
        </div>

    )
}

