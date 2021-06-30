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
    
        <div>
                <div className="  flex  bg-gray-100 justify-start py-2  border border-gray-200 hover:border-gray-900">
                        <div className='w-7/12 align-middle coin flex-initial'>
                        
                            <td>
                                <h1 className="px-2 align-middle capitalize font-bold">{name}</h1>
                            </td>
                            <td className="align-middle">
                                <p className='coin-symbol uppercase text-gray-500'>{ticker}</p>
                            </td>
                        </div>
                            <div className="  w-2/12  align-middle flex-auto flex-grow ">  
                                <td className="float-left" >
                                    <p>{count}</p>    
                                </td>
                            </div>
                            
                            <div className=" ml-10  w-3/12 align-middle flex-auto flex-grow">
                                <td className="float-left"> 
                                    <div className=" ml-auto  align-middle flex-auto flex-grow">
                                        <p className="font-bold pr-4 justify-end">${(price*count).toFixed(2)}</p>
                                    </div>
                                </td>
                            </div> 
                        
                    </div>
        </div>

    )
    
}

export default HoldingsItem