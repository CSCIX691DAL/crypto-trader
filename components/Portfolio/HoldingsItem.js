import React from 'react'

import { getCoinInfo } from '../../services/coins'
import { sell } from '../../services/transactions'
import MD5 from 'crypto-js/md5'
import encoder from 'crypto-js/enc-hex'
import { useSession } from 'next-auth/client'


const HoldingsItem = ({ name, count }) => {
    const [ticker, setTicker] = React.useState();
    const [price, setPrice] = React.useState();
    const [session, loading] = useSession();
    const [ amount, setAmount ] = React.useState();

    React.useEffect(() => {
        const getCoinDetails = async () => {
            // grab coin details/pics from CoinGecko
            const data = await getCoinInfo(name);
            setTicker(data.symbol);
            setPrice(data.market_data.current_price.cad);
        }

         getCoinDetails();
    }, [price, ticker]);

    return (

        <tr className="flex bg-white py-2 border border-gray-200 hover:border-gray-900">
            <td className="w-4/12">
                <p className="px-2 capitalize font-bold inline">{name}</p>
                <p className="coin-symbol uppercase text-gray-500 inline">{ticker}</p>
            </td>

            <td className="w-4/12">
                <p>{count}</p>    
            </td>
                
            <td className="w-4/12"> 
                <div className=" ml-auto align-middle flex-auto flex-grow">
                    <p className="font-bold pr-4 justify-end">${(price*count).toFixed(2)} CAD</p>
                </div>
                <form>
                <input type="number" min="0" placeholder="Amount" onChange={event => setAmount(event.target.value)} />
                {
                    session ? (
                            <button onClick={() => {sell(name, count, amount, MD5(session.user.email).toString(encoder))}} className="rounded-xl px-2 py-1 bg-blue-500 text-white" type="button">Sell</button>
                        ) : (
                            <button className="rounded-xl p-2 bg-gray-200 text-white" type="button">Sell</button>
                        )
                }
            </form>
            </td>
        </tr>
    )
    
}

export default HoldingsItem