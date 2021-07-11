import Head from 'next/head'
import Header from '../components/Header'
import { useSession } from 'next-auth/client'
import * as React from 'react'
import { getTransactionListForUsers } from '../services/transactions'
import { getUserHoldings, getUserWatchlist } from '../services/user'
import MD5 from 'crypto-js/md5'
import encoder from 'crypto-js/enc-hex'
import TransactionsItem from '../components/Portfolio/TransactionsItem'
import HoldingsItem from '../components/Portfolio/HoldingsItem'
import WatchItem from '../components/Portfolio/WatchItem'


/**
 * A user's portfolio:
 *   - holdings
 *   - transactions
 *   - watchlist
 * 
 * Uses information from CoinGecko
 */
export default function Portfolio() {
    const [session, loading] = useSession();
    const [transactions, setTransactions] = React.useState([]);
    const [holdings, setHoldings] = React.useState({});
    const [search, setSearch] = React.useState("");
    const [watchlist,setWatchlist] = React.useState({});

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

        const getWatchlist = async () => {
            const userWatchlist = await getUserWatchlist(hashEmail());
            setWatchlist(userWatchlist.data);
        }
        
        getWatchlist();
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

            <div className="py-4  m-auto w-10/12 md:w-6/12 ">
                <div className="m-auto ">
                <h1 className=" my-5 font-bold">Holdings:</h1>
                </div>

                <input className="border-2 border-gray-300 bg-white h-9 px-5 rounded-lg text-sm focus:outline-none w-auto mr-0"
                                type="search" name="search" placeholder="Search" onChange={e => setSearch(e.currentTarget.value)} />
            
                <table className="m-auto w-full">
                    <tbody>
                    <tr className="flex  bg-blue-200 py-2 border border-blue-300">
                        <td className="w-6/12 px-2 font-bold items-start" ><span className="mr-5">Coins </span>
                        </td>
                        <td className="w-1/12 py-2 font-bold items-start">Quantity</td>
                        <td className="w-2/12 py-2 font-bold px-2 items-end">Total Value</td>
                        <td className="w-3/12 py-2 font-bold items-start">Sell</td>
                    </tr>
                        {holdings &&
                            (Object.entries(holdings)
                            .filter(coin => {
                                if (search === "") return coin;
                                else if (coin[0].toLowerCase().includes(search.toLowerCase())) return coin;
                                else return false;
                            })
                            .map(([key, value], index) => {
                                return <HoldingsItem key={index} name={key} count={value} />
                            }))
                        }
                    </tbody>
                </table>

                <div className="m-auto ">
                <h1 className=" my-5 font-bold">Recent Transactions:</h1>
                </div>
               
                <table className="m-auto w-full py-2">
                    <tbody>
                        <tr className="flex py-2 bg-blue-200 border border-blue-300">
                            <td className="w-6/12 py-2 px-2 font-bold items-start" >Coin</td>
                            <td className="w-3/12 py-2 font-bold items-start">Quantity</td>
                            <td className="w-3/12 py-2 font-bold items-start">Transaction Total</td>
                        </tr>

                        {transactions.map((transaction, key) => {
                         return <TransactionsItem key={key} transaction={transaction} />
                    })}
                    </tbody>
                </table>

                 <div className="m-auto">   
                    <h1 className="m-auto my-5 font-bold">Watchlist:</h1>  
                </div>

                <table className="m-auto w-full py-2">
                    <tbody>
                        <tr className="flex  bg-blue-200 py-2 border border-blue-300">
                            <td className="w-8/12 p-2 font-bold items-start" ><span className="mr-5">Coin</span></td>
                            <td className="w-2/12 py-2 font-bold items-start">Change</td>
                            <td className="w-2/12 py-2 font-bold items-start">Price</td>
                        </tr>
                    </tbody>
                {watchlist &&
                    (Object.entries(watchlist).map(([key], index) => {
                        return <WatchItem name={key} key={index} />
                    }))
                }
                </table>
        </div>
        </div>
    )
}