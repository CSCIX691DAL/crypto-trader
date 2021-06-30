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

        <div>
                <div className=" flex  bg-gray-100 justify-start py-2  border border-gray-200 hover:border-gray-900">
                        <div className='w-5/12 align-middle coin flex-initial'>
                            <td>
                                <h1 className="px-2 capitalize font-bold">{transaction.stock_name}</h1>
                            </td>
                            <td className="align-middle">
                                <p className='coin-symbol uppercase text-gray-500'>{ticker}</p>
                            </td>
                        </div>
                            <div className="  w-5/12 align-middle flex-auto flex-grow ">  
                                <td className="float-right" >
                                    <p>Purachased {transaction.num_purchased} @ ${(transaction.total_transaction/transaction.num_purchased).toFixed(2)}</p>    
                                </td>
                            </div>
                            
                            <div className=" ml-10  w-2/12 align-middle flex-auto flex-grow">
                                <td className="float-left"> 
                                    <div className=" ml-auto align-middle flex-auto flex-grow">
                                        <p className="font-bold pr-4 justify-end">${transaction.total_transaction}</p>
                                    </div>
                                </td>
                            </div> 
                        
                    </div>

            
        </div>
    )
}

export default TransactionItem