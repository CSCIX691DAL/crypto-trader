import React from 'react'
import { sell } from '../../services/transactions'
import MD5 from 'crypto-js/md5'
import encoder from 'crypto-js/enc-hex'
import { useSession } from 'next-auth/client'

const HoldingsItem = ({ name, count }) => {
    const [session, loading] = useSession();
    const [ amount, setAmount ] = React.useState();

    return (
        <div>
            <br />
            <p>Coin: {name}</p>
            <p>Count: {count}</p>
            <form>
                <input type="number" min="0" placeholder="Amount" onChange={event => setAmount(event.target.value)} />
                {
                    session ? (
                            <button onClick={() => {sell(name, count, amount, MD5(session.user.email).toString(encoder))}} className="rounded-xl px-2 py-1 bg-blue-500 text-white" type="button">Sell</button>
                        ) : (
                            <button className="rounded-xl p-2 bg-gray-200 text-white" type="button">Sell</button>
                        )
                }
            </form>
            
            <br />
        </div>
    )
}

export default HoldingsItem