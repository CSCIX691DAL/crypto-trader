import Head from 'next/head'
import Header from '../../components/Header'
import * as React from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import MD5 from 'crypto-js/md5'
import encoder from 'crypto-js/enc-hex'
import { addTransactionToUser } from '../../services/transactions'
import { addTransactionToPortfolio } from '../../services/user'

export default function Coin() {
    const [ session, loading ] = useSession();
    const router = useRouter();
    const [ amount, setAmount ] = React.useState('');

    const { coin } = router.query;

    function purchase() {

        // confirm the purchase with the user
        let upperName = {coin}.coin.charAt(0).toUpperCase() + {coin}.coin.slice(1);
        if (!confirm("Are you sure you want to purchase " + amount + " " + upperName + "?")) {
            return false;
        }

        // get the user's id by hashing their email
        const hash =  MD5(session.user.email).toString(encoder);

        // add a transaction to firebase
        const createTransaction = async(hash, coinName, amount) => {

            const transaction = {
                num_purchased: amount,
                stock_name: coinName,
                total_transaction: amount,
                user_id: hash
            }

            const res1 = await addTransactionToUser(hash, transaction);
            const res2 = await addTransactionToPortfolio(hash, transaction);
            if (res1.status === 200 && res2.status === 200) {
                alert("Purchase successful");
            }
 
        }

        createTransaction(hash, {coin}.coin, amount);
        
        return false;
    }

    return (
        <>
            <Head>
                <title>CryptoTrader</title>
                <meta name="description" content="View prices and trade cryptocurrencies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header/>
            <div className="m-8 flex flex-col font-semibold text-lg text-gray-800 justify-center">
                <div className="px-4 py-2 m-2">
                    Here's some info about {coin} 💰
                </div>
                
                <div className="items-center m-2">
                    <form>
                        <input type="number" min="0" placeholder="Amount" onChange={event => setAmount(event.target.value)} className="mr-2 border-b border-blue-500" />
                        {
                            session ? (
                                <button onClick={() => purchase()} className="rounded-xl p-2 bg-blue-500 text-white" type="button">Purchase</button>
                            ) : (
                                <button className="rounded-xl p-2 bg-gray-200 text-white" type="button">Purchase</button>
                            )
                        }
                    </form>
                </div> 
            </div>
        </>
    )
}