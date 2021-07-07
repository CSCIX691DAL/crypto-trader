import Head from 'next/head'
import Header from '../components/Header'
import { useSession } from 'next-auth/client'
import * as React from 'react'
import { getTransactionListForUsers } from '../services/transactions'
import { getUserHoldings } from '../services/user'
import MD5 from 'crypto-js/md5'
import encoder from 'crypto-js/enc-hex'
import TransactionsItem from '../components/Portfolio/TransactionsItem'
import HoldingsItem from '../components/Portfolio/HoldingsItem'

export default function Portfolio() {
    const [session, loading] = useSession();
    const [transactions, setTransactions] = React.useState([]);
    const [holdings, setHoldings] = React.useState({});
    const [search, setSearch] = React.useState("");

    const hashEmail = () => {
        return MD5(session ? session.user.email : '').toString(encoder);
    }

    React.useEffect(() => {
        const getTransactions = async () => {
            const userTransactions = await getTransactionListForUsers(hashEmail());
            setTransactions(userTransactions);
        }

        const getHoldings = async () => {
            const userHoldings = await getUserHoldings(hashEmail());
            setHoldings(userHoldings.data);
        }

        getHoldings();
        getTransactions();
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

            <main className="m-8 flex font-semibold text-lg text-gray-800 justify-center">
                {session ?
                    (<div>
                        <h1>My Portfolio 📈</h1>
                    </div>) :
                    (<div>Please login with Google above ☝</div>)
                }
            </main>

            <div className="py-4">
                
                <table className="m-auto w-10/12 md:w-6/12 py-2">
                    <tbody>
                        <tr className="m-auto my-5 font-bold"><tr>Holdings:</tr></tr>
                        <input className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-1/4 m-auto"
                    type="search" name="search" placeholder="Search" onChange={e => setSearch(e.currentTarget.value)} />
                        <tr className="flex bg-blue-200 py-2 border border-blue-300">
                            <td className="w-6/12 px-2 font-bold items-start" >Coin</td>
                            <td className="w-1/12 font-bold items-start">Quantity</td>
                            <td className="w-2/12 font-bold items-start">Total Value</td>
                            <td className="w-3/12 font-bold items-start">Sell</td>
                        </tr>
                        {holdings &&
                            (Object.entries(holdings)
                            .filter(coin => {
                                if (search === "") return coin;
                                else if (coin[0].toLowerCase().includes(search.toLowerCase())) return coin;
                                else return false;
                            })
                            .map(([key, value]) => {
                                return <HoldingsItem name={key} count={value} />
                            }))
                        }
                    </tbody>
                </table>
            </div>

            <div className="py-4">
                <table className="m-auto w-10/12 md:w-6/12 py-2">
                    <tbody>
                        <tr className="m-auto my-5 font-bold"><tr>Recent Transactions:</tr></tr>

                        <tr className="flex bg-blue-200 py-2 border border-blue-300">
                            <td className="w-6/12 px-2 font-bold items-start" >Coin</td>
                            <td className="w-3/12 font-bold items-start">Quantity</td>
                            <td className="w-3/12 font-bold items-start">Transaction Total</td>
                        </tr>
                        {transactions.map(transaction => {
                            return <TransactionsItem transaction={transaction} />
                        })}
                    </tbody>
                </table>
            </div>

            <div>
                <h1 className="ml-96 my-5 font-bold">Watchlist:</h1>
            </div>

        </div>
    )
}