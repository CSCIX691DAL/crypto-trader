import Head from 'next/head'
import Header from '../../components/Header'
import * as React from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import MD5 from 'crypto-js/md5'
import encoder from 'crypto-js/enc-hex'
import { purchase } from '../../services/transactions'
import { getCoinInfo } from '../../services/coins'
import axios from 'axios'
import PriceChart from '../../components/PriceChart'
import { addtoWatchList } from '../../services/user'

/**
 * Webpage for viewing detailed information about a cryptocurrency
 * 
 * Uses information from CoinGecko
 */
export default function Coin() {
    const [session, loading] = useSession();
    const router = useRouter();
    const [amount, setAmount] = React.useState('amount');
    const { coin } = router.query;
    const coinName = { coin }.coin;
    const COIN_GECKO_URL = `https://api.coingecko.com/api/v3/`;

    const hashEmail = () => {
        return MD5(session.user.email).toString(encoder);
    }
    const [coinData, setCoinData] = React.useState({})
    const format = data => {
        return data.map(e => {
            return {
                t: e[0],
                y: e[1].toFixed(2)
            }
        })
    }

    React.useEffect(() => {
        const fetchdata = async () => {
            const resDay = await axios.get(`${COIN_GECKO_URL}coins/${coinName}/market_chart`, {
                params: {
                    vs_currency: "cad",
                    days: "1",
                },
            });
            const resWeek = await axios.get(`${COIN_GECKO_URL}coins/${coinName}/market_chart`, {
                params: {
                    vs_currency: "cad",
                    days: "7",
                },
            });
            const resMonth = await axios.get(`${COIN_GECKO_URL}coins/${coinName}/market_chart`, {
                params: {
                    vs_currency: "cad",
                    days: "31",
                },
            });
            const resYear = await axios.get(`${COIN_GECKO_URL}coins/${coinName}/market_chart`, {
                params: {
                    vs_currency: "cad",
                    days: "365",
                },
            });

            setCoinData({
                day: format(resDay.data.prices),
                week: format(resWeek.data.prices),
                month: format(resMonth.data.prices),
                year: format(resYear.data.prices)
            });
        };

        coinName && fetchdata();
    }, [coinName])

    const [ticker, setTicker] = React.useState();

    const [cap, setCap] = React.useState();
    const [price, setPrice] = React.useState();
    const [volume, setVolume] = React.useState();
    const [supply, setSupply] = React.useState();

    React.useEffect(() => {
        const getCoinDetails = async () => {
            // grab coin details/pics from CoinGecko
            const data = await getCoinInfo({ coin }.coin);

            setTicker(data.symbol);
            setPrice(data.market_data.current_price.cad);
            setCap(data.market_data.market_cap.cad);
            setVolume(data.market_data.total_volume.cad);
            setSupply(data.market_data.circulating_supply);
        }

        coinName && getCoinDetails();
    }, [coinName, cap, price, volume, supply, ticker]);

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

            <div className="flex m-8 flex-col font-semibold text-lg text-gray-800 justify-center items-center">
                <div className="px-4 py-2 m-2 text-4xl">
                     {coinName ? coinName.charAt(0).toUpperCase() + coinName.slice(1) : ""} 
                </div>

                <div className="px-6 py-6 w-11/12 md:w-1/2 ..."><PriceChart data={coinData} /></div>

                <div className=" bg-white shadow overflow-hidden sm:rounded justify-center items-center w-11/12 md:w-1/2" >
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{coinName ? coinName.charAt(0).toUpperCase() + coinName.slice(1) : ""} Details</h3>

                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            {/*add coin details through API - Ticker code:*/}
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500"> Ticker</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ticker}</dd>
                            </div>

                            {/*/*add coin details through API - Price in CAD Dollars (use this as standard)*/}
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Price</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> ${price} CAD</dd>
                            </div>

                            {/*add coin details through API - Market Cap*/}
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Market Cap</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${cap} CAD</dd>
                            </div>

                            {/*add coin details through API - Volume (24h)*/}
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500"> Volume (24h)</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${volume} CAD</dd>
                            </div>

                            {/*add coin details through API - Circulating supply*/}
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Circulating Supply</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {supply}  </dd>
                            </div>

                            <div className=" flex m-10 justify-center">
                                <dt className="text-m font-medium text-gray-500 pr-5 pt-3"> Purchase {coin}, enter amount: </dt>


                                <div className="items-center m-2">
                                    <form>
                                        <input type="number" min="0" placeholder="Amount" onChange={event => setAmount(event.target.value)} className="mr-2 border-b border-blue-500" />
                                        {
                                            session ? (
                                                <button onClick={() => purchase({ coin }.coin, (amount ? amount : 0), hashEmail())} className="rounded-xl p-2 bg-blue-500 text-white" type="button">Purchase</button>
                                            ) : (
                                                <button className="rounded-xl p-2 bg-gray-200 text-white" type="button">Purchase</button>
                                            )
                                        }
                                    </form>
                                    <button onClick={() => addtoWatchList(coinName, hashEmail())} className="mr-2 rounded-xl p-2 bg-blue-500 text-white" > Add to Watchlist </button>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}