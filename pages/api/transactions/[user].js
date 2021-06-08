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
            await db.collection('transactions').add({
                num_purchased: req.body.num_purchased,
                stock_name: req.body.stock_name,
                total_transaction: req.body.total_transaction,
                user_id: req.body.user_id
            }).then(() => {
                res.status(200).json({
                    message: "Added transaction to database"
                })
            }).catch((error) => {
                console.error("Error adding transaction to database", error)
            });
        }

    } catch {
        res.status(400).json({
            message: "Can't find any data..."
        });
    }
}