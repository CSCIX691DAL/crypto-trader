import React from 'react'

const DashboardTableItem = ({ coin }) => {
    return (
        <div className='coin-container'>
            <div className='coin-row'>
                <div className='coin'>
                    <img src={coin.image} alt="crypto"/>
                <h1>{coin.id}</h1>
                <p className='coin-symbol'>{coin.symbol} </p>

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
