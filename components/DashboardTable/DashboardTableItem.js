import React from 'react'
import Link from 'next/link'

const DashboardTableItem = ({ coin }) => {
    return (
        <div className='coin-container'>
            <div className='coin-row'>
                <div className='coin'>
                    <img src={coin.image} alt="crypto" />

                    <p className='coin-symbol'>{coin.symbol} </p>

                    <Link key={coin.id} href={`/coins/${coin.id}`}>
                        <h1 className="cursor-pointer text-xl font-sans text-gray-700 font-semibold">{coin.id}</h1>
                    </Link>
                </div>
                <div className='coin-data'>
                    <p className='coin-price'>${coin.current_price}</p>

                    <p className='coin-percent'>{coin.price_change_percentage_24h.toFixed(2)}%</p>

                </div>
            </div>

        </div>
    )
}

export default DashboardTableItem
