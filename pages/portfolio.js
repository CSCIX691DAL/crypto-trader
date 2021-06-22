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
                    (<div>This is where you'll see your portfolio, {session.user.name.split(" ")[0]} 📈</div>) :
                    (<div>Please login with Google above ☝</div>)
                }
            </main>
            <div>
                <h2>Holdings:</h2>
                {holdings &&
                    Object.entries(holdings).map(([key, value]) => {
                        return <HoldingsItem name={key} count={value} />
                    })
                }
            </div>

            <div>
                <h2>Recent Transactions:</h2>
                {transactions.map(transaction => {
                    return <TransactionsItem transaction={transaction} />
                })}
            </div>

            <div>
                <h2>Watchlist:</h2>

            </div>
        </div>
    )
}