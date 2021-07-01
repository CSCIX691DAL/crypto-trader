import React from 'react'
import { getCoinInfo } from '../../services/coins'


const HoldingsItem = ({ name, count }) => {
    const [ticker, setTicker] = React.useState();
    const [price, setPrice] = React.useState();

    React.useEffect(() => {
        const getCoinDetails = async () => {
            // grab coin details/pics from CoinGecko
            const data = await getCoinInfo(name);
            setTicker(data.symbol);
            setPrice(data.market_data.current_price.cad);
        }

         getCoinDetails();
    }, [  price, ticker]);

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
                    <p className="font-bold pr-4 justify-end">${(price*count).toFixed(2)}</p>
                </div>
            </td>
        </tr>

    )
    
}

export default HoldingsItem