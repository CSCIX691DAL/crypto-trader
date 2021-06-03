import React from 'react'

const DashboardTable = ({name,image,symbol,price,volume, priceChange}) => {
    return (
        <div className='coin-container'>
            <div className='coin-row'>
                <div className='coin'>
                    <img src={image} alt="crypto"/>
                <h1>{name}</h1>
                <p className='coin-symbol'>{symbol} </p>

                </div>
            <div className='coin-data'>
                <p className='coin-price'>${price}</p>
                <p className='coin-volume'>{volume}</p>

                <p className='coin-percent'>{priceChange.toFixed(2)}%</p>
                
            </div>
            </div>
            
        </div>
    )
}

export default DashboardTable
