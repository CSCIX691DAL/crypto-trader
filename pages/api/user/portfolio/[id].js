import db from "../../../../utils/db"
import admin from 'firebase-admin'

export default async (req, res) => {
    const { id } = req.query;

    try {
        if (req.method === 'POST') {
            await db.collection('users').doc(id).update({
                    ["holdings." + req.body.coin]: admin.firestore.FieldValue.increment(parseInt(req.body.amount))
                })
                .then(() => {
                    res.status(200).json({
                        message: "Added transaction to portfolio"
                    });
                })
                .catch((error) => {
                    console.error("Error adding transaction to portfolio", error);
                });
            
        } 
    } catch {
        res.status(400).json({
            message: "Can't find any data..."
        });
    }
}