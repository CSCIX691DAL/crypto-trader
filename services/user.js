import axios from 'axios'

/**
 * Helper methods for interacting with users on Firestore
 * 
 * Most methods wrap around local API calls, see
 * /pages/api/user/
 */

const USER_URL = `http://localhost:3000/api/user`;

/**
 * Get details for a user from Firestore by ID
 * @param {string} userID - hashed username/email
 * @returns {object} local API response
 */
export const getUser = async (userID) => {
	const res = await axios.get(`${USER_URL}/${userID}`);
	return {
		data: res.data,
		status: res.status
	};
}

/**
 * Get all user IDs
 * @returns {object} list of all user IDs
 */
export const getAllUserIDs = async () => {
	const res = await axios.get(`${USER_URL}`);
	return res.data;
}

/**
 * Add a user to Firestore
 * Note: gmail users use email, custom users can use username or email
 * @param {string} hash - hashed username/email
 * @param {string} userEmail - plaintext username/email
 * @param {string} userName - full name of user
 * @param {string} password - hashed password
 * @returns {object} local API response
 */
export const createUser = async (hash, userEmail, userName, password) => {
	const res = await axios.post(`${USER_URL}/${hash}`, {
		email: userEmail,
		name: userName,
		password: password
	});
	return res.data;
}

/**
 * Remove a user from Firestore
 * @param {string} userID - hashed username/email
 * @returns {object} local API response
 */
export const deleteUser = async (userID) => {
	const res = await axios.delete(`${USER_URL}/${userID}`);
	return res.data;
}

/**
 * Increment/decrement user's holdings
 * @param {string} hash - hashed username/email
 * @param {object} transaction - coin name and amount bought/sold
 * @returns {object} local API response
 */
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

/**
 * Get list of all coins/amounts that a user holds
 * @param {string} hash 
 * @returns {object} local API response
 */
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

