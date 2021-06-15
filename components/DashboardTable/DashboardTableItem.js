import React from 'react'
import Link from 'next/link'

const DashboardTableItem = ({ coin }) => {
    return (
        <div >	
            <Link key={coin.id} href={`/coins/${coin.id}`}>	
            <div className="cursor-pointer">
                <div className=" flex py-2 mb-1 border border-gray-200 hover:border-gray-900">
                    <div className='w-8/12 align-middle coin flex-initial'>
                        <td className="px-4"> 
                            <p><img className="h-10 w-10" src={coin.image} alt="crypto"/></p>
                        </td>
                        <td>
                            <h1 className="px-2 capitalize font-bold">{coin.id}</h1>
                        </td>
                        <td className="align-middle">
                            <p className='coin-symbol uppercase text-gray-500'>{coin.symbol}</p>
                        </td>
                    </div>
                        
                    <div className=" py-2 align-middle flex-initial">
                        <td className="px-10" > 
                                {coin.price_change_percentage_24h<0?(            
                                    <p className='coin-percent text-red-500'>
                                {coin.price_change_percentage_24h.toFixed(2)}%</p>
                                ):(
                                    <p className='coin-percent text-green-500'>
                                {coin.price_change_percentage_24h.toFixed(2)}%</p>
                                )}
                        </td>
                        <td> 
                            <p className="font-bold pr-4 justify-end">${coin.current_price.toFixed(2)}</p> 
                        </td>
                    </div>
                </div>  
            </div>
            </Link>		
        </div>
    )
}

export default DashboardTableItem