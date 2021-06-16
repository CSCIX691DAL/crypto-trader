import Head from 'next/head'
import Header from '../../components/Header'
import * as React from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import MD5 from 'crypto-js/md5'
import encoder from 'crypto-js/enc-hex'
import { purchase } from '../../services/transactions'

import { useEffect } from 'react'
import axios from 'axios'
import {COIN_GECKO_URL} from '../../services/coins'
import PriceChart from '../../components/PriceChart'





export default function Coin() {
    const [ session, loading ] = useSession();
    const router = useRouter();
    const [ amount, setAmount ] = React.useState('amount');
    const { coin } = router.query;
    const coinName = {coin}.coin;
    const COIN_GECKO_URL = `https://api.coingecko.com/api/v3/`;

    const hashEmail = () => {
        return MD5(session.user.email).toString(encoder);
    }
    const [coinData, setCoinData] = React.useState({})
    const format = data => {
        return data.map(el => {
            return {
                t: el[0],
                y: el[1].toFixed(2)
            }
        })
    }

         useEffect(() => {
         const fetchdata = async() =>{
            const resDay = await axios.get(`${COIN_GECKO_URL}coins/${coinName}/market_chart`, {
             params: {
                 vs_currency: "usd",
                days: "1",
             },
            });
            const resWeek = await axios.get(`${COIN_GECKO_URL}coins/${coinName}/market_chart`, {
                params: {
                    vs_currency: "usd",
                   days: "7",
                },
               });
               const resMonth = await axios.get(`${COIN_GECKO_URL}coins/${coinName}/market_chart`, {
                params: {
                    vs_currency: "usd",
                   days: "800",
                },
               });
            
            setCoinData({
                day: format(resDay.data.prices),
                week: format(resWeek.data.prices),
                 month: format(resMonth.data.prices)
                });
               
             

        };
    
        coinName ? fetchdata(): ""; 
        
    }, [coinName])

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
                <div><PriceChart data ={coinData}/></div>
            
                
                <div className="items-center m-2">
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
            </div>
        </>
    )
}