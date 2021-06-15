import React from 'react'

const HoldingsItem = ({ name, count }) => {
    return (
        <div>
            <br />
            {/* <p>This should be working </p> */}
            <p>Coin: {name}</p>
            <p>Count: {count}</p>
            <br />
        </div>
    )
}

export default HoldingsItem