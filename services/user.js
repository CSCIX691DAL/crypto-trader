import axios from 'axios'

const USER_ROUTE = `/api/transactions`;
let USER_URL;
if (window.location.hostname === 'localhost') {
    // http://localhost:3000/api/user
    TRANSACTIONS_URL = window.location.protocol + '//' + window.location.hostname + ':3000' + USER_ROUTE;
}
else {
    // google cloud deployment
    console.log(window.location.protocol + '//' + window.location.hostname + USER_ROUTE);
    TRANSACTIONS_URL = window.location.protocol + '//' + window.location.hostname + USER_ROUTE;
}

export const getUser = async (userID) => {
    const res = await axios.get(`${USER_URL}/${userID}`);
    return {
        data: res.data,
        status: res.status
    };
}

export const createUser = async (hash, userEmail, userName) => {
    const res = await axios.post(`${USER_URL}/${hash}`, {
        email: userEmail,
        name: userName
    });
    return res.data;
}

export const deleteUser = async (userID) => {
    const res = await axios.delete(`${USER_URL}/${userID}`);
    return res.data;
}

export const addTransactionToPortfolio = async (hash, transaction) => {
    const res = await axios.post(`${USER_URL}/portfolio/${hash}`, {
        coin: transaction.stock_name,
        amount: transaction.num_purchased
    });
    return {
        data: res.data,
        status: res.status
    };
}

export const getUserHoldings = async (hash) => {
    const res = await axios.get(`${USER_URL}/${hash}`);
    return {
        data:res.data.holdings
    }
}