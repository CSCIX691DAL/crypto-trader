import axios from 'axios'
import { getCoinInfo } from './coins'
import { addTransactionToPortfolio } from './user'

/**
 * Helper methods for interacting with Firebase for transactions
 * 
 * Most methods wrap around local API calls, see
 * /pages/api/transactions/
 */

const TRANSACTIONS_URL = `http://localhost:3000/api/transactions`;

/**
 * Get all transactions for a given user from Firestore
 * @param {stirng} userId - hashed username/email
 * @returns {object} list of all transactions for the user
 */
export const getTransactionListForUsers = async (userId) => {
	const res = await axios.get(`${TRANSACTIONS_URL}/${userId}`);
	return res.data;
}

/**
 * Add a transaction to Firestore under 'transactions'
 * @param {string} hash - hashed username/email
 * @param {object} transaction - transaction details
 * @returns {object} local API result
 */
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

/**
 * Process a transaction with Firestore
 * @param {string} hash - hashed username/email
 * @param {string} coinName - CoinGecko coin ID
 * @param {number} amount - amount of coins purchased/sold
 */
export const createTransaction = async (hash, coinName, amount) => {
	const coinInfo = await getCoinInfo(coinName);
	const totalPrice = amount * coinInfo.market_data.current_price.cad;

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
		window.location.href = "/success";
	} else {
		alert("Something went wrong, please try again")
	}

}

/**
 * Transaction handler - this function gets called when buying
 * @param {string} coinName - CoinGecko coin ID
 * @param {number} count - number of coins being bought
 * @param {string} userId - hashed email/username
 * @returns {boolean} false so that page doesn't refresh on submission
 */
export const purchase = async (coinName, count, userId) => {
	// user must enter something before proceeding
	if (count <= 0 || count === 'amount') {
		alert("Enter a positive number. Cannot purchase less than 0.")
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

/**
 * Transaction handler - this function gets called when selling
 * @param {string} coinName - CoinGecko coin ID
 * @param {number} count - number of coins being sold
 * @param {string} userId - hashed email/username
 * @returns {boolean} false so that page doesn't refresh on submission
 */
export const sell = async (coinName, heldAmount, amountSold, userId) => {
	// user must enter something before proceeding
	if (amountSold <= 0 || amountSold === 'amount' || amountSold === undefined) {
		alert("Error: enter a valid positive number. Cannot sell less than 0.")
		return false;
	}

	if (heldAmount < amountSold) {
		alert("Error: can't sell more than you currently hold. Enter a smaller number.");
		return false;
	}

	// confirm the purchase with the user
	let upperName = coinName.charAt(0).toUpperCase() + coinName.slice(1);
	if (!confirm("Are you sure you want to sell " + amountSold + " " + upperName + "?")) {
		return false;
	}

	createTransaction(userId, coinName, amountSold * -1);

	// return false so page isn't refreshed
	return false;
}