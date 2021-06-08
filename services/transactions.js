import axios from 'axios'

const TRANSACTIONS_URL = `http://localhost:3000/api/transactions`;

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