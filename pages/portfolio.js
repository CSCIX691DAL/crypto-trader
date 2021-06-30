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

    const hashEmail = () => {
        return MD5(session ? session.user.email : '').toString(encoder);
    }

    React.useEffect(() => {
        const getTransactions = async () => {
            const userTransactions = await getTransactionListForUsers(hashEmail());
            setTransactions(userTransactions);
        }

        getTransactions();
    }, []);

    React.useEffect(() => {
        const getHoldings = async () => {
            const userHoldings = await getUserHoldings(hashEmail());
            setHoldings(userHoldings.data);
        }

        getHoldings();
    }, []);

    return (
        <div>
            <Head>
                <title>CryptoTrader</title>
                <meta name="description" content="View prices and trade cryptocurrencies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <main className="m-8 flex font-semibold text-lg text-gray-800 justify-center">
                {session ?
                    (<div>
                        <h1>My Portfolio 📈</h1> 
                        </div>) :
                    (<div>Please login with Google above ☝</div>)
                }
            </main>
            <div >
                <div className='m-8 flex flex-col font-normal text-base text-gray-800 '>  

                    <table className="m-auto w-11/12 md:w-1/2">
                    <h1  className = "m-auto my-5 font-bold">Holdings:</h1>

                        <div className="flex bg-blue-200 py-2 border border-blue-300 hover:border-blue-900">
                            <div className = "w-6/12   font-bold">
                                <th className="pl-4" >Coins</th>
                            </div>
                            <div className = "w-3/12 float-left font-bold">
                                <th className="pl-4">Quantity</th>
                            </div>
                            <div className = " w-3/12 font-bold float-left">
                                <th className="  pl-4">Total Value</th>
                            </div>
                        </div>
                        <div>
                            {holdings &&
                                Object.entries(holdings).map(([key, value]) => {
                                    return <HoldingsItem name={key} count={value} />
                                })
                            }
                        </div>
                    </table>
                </div>
            </div>
            <div className='m-8 flex flex-col font-normal text-base text-gray-800 '>
                <table className="m-auto w-11/12 md:w-1/2">
                <h1  className = "m-auto my-5 font-bold">Recent Transactions:</h1>

                <div className="flex bg-blue-200 py-2 border border-blue-300 hover:border-blue-900">
                            <div className = "w-7/12   font-bold">
                                <th className="pl-4" >Coins</th>
                            </div>
                            <div className = "w-3/12 float-left font-bold">
                                <th className="pl-6">Quantity</th>
                            </div>
                            <div className = " w-2/12 font-bold float-left">
                                <th className=" pl-4">Total</th>
                            </div>
                        </div>
                    {transactions.map(transaction => {
                    return <TransactionsItem transaction={transaction} />
                    })}   
                </table>
            </div>

            <div>
                <h1  className = "ml-96 my-5 font-bold">Watchlist:</h1>
                          </div>
            
        </div>
    )
}