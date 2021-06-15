import React from 'react'

const TransactionItem = ({ transaction }) => {
    return (
        <div>
            <br />
            <p>Coin: {transaction.stock_name}</p>
            <p>Count: {transaction.num_purchased}</p>
            <p>Total: {transaction.total_transaction}</p>
            <br />
        </div>
    )
}

export default TransactionItem