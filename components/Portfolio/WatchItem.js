import React from 'react'
import { getCoinInfo } from '../../services/coins'
import Link from 'next/link'

const WatchItem = ({name}) => {
    const [ticker, setTicker] = React.useState();
    const [price, setPrice] = React.useState();
    const[image, setImage] = React.useState();
    const[percentage, setPercentage] = React.useState();

    React.useEffect(() => {
        const getCoinDetails = async () => {
            // grab coin details/pics from CoinGecko
            const data = await getCoinInfo(name);
            setTicker(data.symbol);
            setPrice(data.market_data.current_price.cad);
            setImage(data.image.small);
            setPercentage(data.market_data.price_change_percentage_24h);
        }

        getCoinDetails();
    }, [price, ticker, image, percentage]);
    return (
        <div>
            <Link key={name} href={`/coins/${name}`}>
                <div className="cursor-pointer">
                    <div className=" flex justify-start py-2 mb-1 border border-gray-200 hover:border-gray-900">
                        <div className='w-8/12 align-middle coin flex-initial'> 
                            <h1 className="px-2 capitalize font-bold inline align-middle">{name}</h1>
                            <p className="align-middle coin-symbol uppercase text-gray-500 inline">{ticker}</p>
                        </div>

                        <div className="w-2/12 py-2 align-middle flex-auto">
                                {price < 0 ? (
                                    <p className="coin-percent text-red-500">
                                        {percentage && percentage.toFixed(2)}%</p>
                                ) : (
                                    <p className="coin-percent text-green-500">
                                        +{percentage && percentage.toFixed(2)}%</p>
                                )}
                        </div>
                            
                        <div className="ml-4 w-2/12 align-middle flex-auto">
                            <div className=" ml-auto py-2 align-middle flex-auto">
                                <p className="font-bold">${price}</p>
                            </div>
                        </div> 
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default WatchItem
