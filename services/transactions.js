import axios from 'axios'
import { getCoinInfo } from './coins'
import { addTransactionToPortfolio } from './user'

const TRANSACTIONS_ROUTE = `/api/transactions`;
let TRANSACTIONS_URL;
if (window.location.hostname === 'localhost') {
    // http://localhost:3000/api/transactions
    TRANSACTIONS_URL = window.location.protocol + '//' + window.location.hostname + ':3000' + TRANSACTIONS_ROUTE;
}
else {
    // google cloud deployment
    console.log(window.location.protocol + '//' + window.location.hostname + TRANSACTIONS_ROUTE);
    TRANSACTIONS_URL = window.location.protocol + '//' + window.location.hostname + TRANSACTIONS_ROUTE;
}


export const getTransactionListForUsers = async (userId) => {
    const res = await axios.get(`${TRANSACTIONS_URL}/${userId}`);
    return res.data;
}

export const addTransactionToUser = async (hash, transaction) => {
    const res = await axios.post(`${TRANSACTIONS_URL}/${hash}`, {
        num_purchased: transaction.num_purchased,
        stock_name: transaction.stock_name,
        total_transaction: transaction.total_transaction,
        user_id: transaction.user_id
    });
    return {
        data: res.data,
        status: res.status
    };
}

export const createTransaction = async(hash, coinName, amount) => {
    const coinInfo = await getCoinInfo(coinName);
    const totalPrice = amount * coinInfo.market_data.current_price.usd;

    const transaction = {
        num_purchased: amount,
        stock_name: coinName,
        total_transaction: totalPrice,
        user_id: hash
    }

    // add item under 'transactions'
    const res1 = await addTransactionToUser(hash, transaction);

    // add item under 'users/USER_ID/holdings'
    const res2 = await addTransactionToPortfolio(hash, transaction);

    // make sure both requests went through
    if (res1.status === 200 && res2.status === 200) {
        alert("Purchase successful");
    }

}

export const purchase = async (coinName, count, userId) => {

    // user must enter something before proceeding
    if (count === 0 || count === 'amount') {
        return false;
    }

    // confirm the purchase with the user
    let upperName = coinName.charAt(0).toUpperCase() + coinName.slice(1);
    if (!confirm("Are you sure you want to purchase " + count + " " + upperName + "?")) {
        return false;
    }

    createTransaction(userId, coinName, count);
    
    // return false so page isn't refreshed
    return false;
}