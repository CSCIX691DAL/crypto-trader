import React from 'react'
import { getCoinInfo } from '../../services/coins'


const TransactionItem = ({ transaction }) => {

    const [ticker, setTicker] = React.useState();
    const [price, setPrice] = React.useState();

    React.useEffect(() => {
        const getCoinDetails = async () => {
            // grab coin details/pics from CoinGecko
            const data = await getCoinInfo(transaction.stock_name);
            setTicker(data.symbol);
            setPrice(data.market_data.current_price.cad);
        }

         getCoinDetails();  
    }, [ price, ticker]);


    return (

        <tr className="flex bg-white py-2 border border-gray-200 hover:border-gray-900">
            <td className="w-4/12">
                <p className="px-2 capitalize font-bold inline">{transaction.stock_name}</p>
                <p className="coin-symbol uppercase text-gray-500 inline">{ticker}</p>
            </td>

            <td className="w-4/12">
                <p>Purachased {transaction.num_purchased} @ ${(transaction.total_transaction/transaction.num_purchased).toFixed(2)}</p>    
            </td>
                
            <td className="w-4/12"> 
                <div className=" ml-auto align-middle flex-auto flex-grow">
                    <p className="font-bold pr-4 justify-end">${transaction.total_transaction}</p>
                </div>
            </td>
        </tr>
    )
}

export default TransactionItem