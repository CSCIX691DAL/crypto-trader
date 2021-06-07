import axios from 'axios'

const TRANSACTIONS_URL = `http://localhost:3000/api/transactions`;

export const getTransactionListForUsers = async (userId) => {
    const res = await axios.get(`${TRANSACTIONS_URL}/${userId}`);
    return res.data;
}