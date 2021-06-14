import Head from 'next/head'
import Header from '../../components/Header'
import * as React from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import MD5 from 'crypto-js/md5'
import encoder from 'crypto-js/enc-hex'
import { purchase } from '../../services/transactions'



export default function Coin() {
    const [ session, loading ] = useSession();
    const router = useRouter();
    const [ amount, setAmount ] = React.useState('amount');
    const { coin } = router.query;

    const hashEmail = () => {
        return MD5(session.user.email).toString(encoder);
    }

    return (
        <>
            <Head>
                <title>CryptoTrader</title>
                <meta name="description" content="View prices and trade cryptocurrencies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header/>

            
            <div className="flex m-8 flex-col font-semibold text-lg text-gray-800 justify-center">
                <div className="px-4 py-2 m-2 text-2xl">
                    Crypto Currency {coin} 💰
                </div>
{/*----------------------------------------------*/}
            
                <div className=" bg-white shadow overflow-hidden sm:rounded w-2/4 justify-center items-center " >
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{coin} Details</h3>
                    
                </div>
                <div className="border-t border-gray-200">
                    <dl>
 {/*add coin details through API - Ticker code:*/}  
        
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500"> Ticker {coin}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{coin}</dd>
                    </div>

 {/*/*add coin details through API - Price in CAD Dollars (use this as standard)*/}  
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Price $CAD</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {/*Ticker code:*/} </dd>
                    </div>

{/*add coin details through API - Market Cap*/}                  
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Market Cap $CAD</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{/*Ticker code:*/}</dd>
                    </div>

{/*add coin details through API - Volume (24h)*/}  
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500"> Volume (24h) $CAD </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{/* volume traded */}</dd>
                    </div>

{/*add coin details through API - Circulating supply*/}  
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Circulating Supply</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {/* Supply*/}  </dd>
                    </div> 

                    <div className=" flex m-10 justify-center">
                    <dt className="text-m font-medium text-gray-500 pr-5 pt-3"> Purchase {coin}, enter amount: </dt>
                    <form>
                        <input type="number" min="0" placeholder="Amount" onChange={event => setAmount(event.target.value)} className="mr-2 border-b border-blue-500" />
                        {
                            session ? (
                                <button onClick={() => purchase({coin}.coin, (amount ? amount : 0), hashEmail())} className="rounded-xl p-2 bg-blue-500 text-white" type="button">Purchase</button>
                            ) : (
                                <button className="rounded-xl p-2 bg-gray-200 text-white" type="button">Purchase</button>
                            )
                        }
                    </form>
                    </div> 
                    </dl>
                </div>
                </div>
            </div>
        

        </>
    )
}