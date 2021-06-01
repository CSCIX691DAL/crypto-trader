import db from "../../../utils/db"

export default async (req, res) => {

    // we will use the user id 
    const { user } = req.query;

    try {
        if (req.method === 'GET') {
            const transactions = (await db.collection('transactions').where('user_id', '==', user).get());
            const result = [];

            transactions.forEach(item => result.push(item.data()));

            res.status(200).json(result);
        } else if (req.method === 'POST') {
            /* 
              * Leave this blank for when we implement the purchase of a transaction
            */
        }

    } catch {
        res.status(400).json({
            message: "Can't find any data..."
        });
    }
}