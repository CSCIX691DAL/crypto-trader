import React from 'react'
import Link from 'next/link'

/**
 * Layout for a single coin's data for Dashboard page
 */
const DashboardTableItem = ({ coin }) => {
    return (
        <div>
            <Link key={coin.id} href={`/coins/${coin.id}`}>
                <div className="cursor-pointer">
                    <div className=" flex justify-start py-2 mb-1 border border-gray-200 hover:border-gray-900">
                        <div className='w-6/12 align-middle coin flex-initial'>
                            <span className="px-2">
                                <img className="h-10 w-10 inline" src={coin.image} alt="crypto" />
                            </span>  
                            <h1 className="px-2 capitalize font-bold inline align-middle">{coin.id}</h1>
                            <p className="align-middle coin-symbol uppercase text-gray-500 inline">{coin.symbol}</p>
                        </div>

                        <div className="w-4/12 py-2 align-middle flex-auto">
                                {coin.price_change_percentage_24h < 0 ? (
                                    <p className="coin-percent text-red-500 float-right">
                                        {coin.price_change_percentage_24h.toFixed(2)}%</p>
                                ) : (
                                    <p className="coin-percent text-green-500 float-right">
                                        +{coin.price_change_percentage_24h.toFixed(2)}%</p>
                                )}
                        </div>
                            
                        <div className="ml-4 w-2/12 align-middle flex-auto">
                            <div className=" ml-auto py-2 align-middle flex-auto">
                                <p className="font-bold">${coin.current_price.toFixed(2)} CAD</p>
                            </div>
                        </div> 
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default DashboardTableItem