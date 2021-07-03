import axios from 'axios'

const USER_URL = `http://localhost:3000/api/user`;

export const getUser = async (userID) => {
    const res = await axios.get(`${USER_URL}/${userID}`);
    return {
        data: res.data,
        status: res.status
    };
}

export const getAllUserIDs = async () => {
    const res = await axios.get(`${USER_URL}`);
    return res.data;
}

export const createUser = async (hash, userEmail, userName, password) => {
    const res = await axios.post(`${USER_URL}/${hash}`, {
        email: userEmail,
        name: userName,
        password: password
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
    return { data: res.data.holdings };
}
export const addtoDatabase = async (coin, hash) => {
    const res = await axios.post(`${USER_URL}/WatchList/${hash}`, {
        coin: coin.coin_name
    });
    return {
        data: res.data,
        status: res.status
    }
}

export const addtoWatchList = async (coinName, hash) => {
    const coin = {
        coin_name: coinName
    }
    const res1 = await addtoDatabase(coin, hash)
    if (res1.status === 200) {
        alert("added to watchlist");
    }
}
export const getUserWatchlist = async (hash) => {
    const res = await axios.get(`${USER_URL}/${hash}`);
    return { data: res.data.watchlist };
}

