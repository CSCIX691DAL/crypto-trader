import db from "../../../../utils/db"
import admin from 'firebase-admin'

export default async (req, res) => {
    const { id } = req.query;

    try {
        if (req.method === 'GET') {
            // implement later
        }
        else if (req.method === 'POST') {
            // increment the value if it exists, otherwise create it
            await db.collection('users').doc(id).update({["watchlist." + req.body.coin]: req.body.coin})
                .then(() => {
                    res.status(200).json({
                        message: "Added to watchList"
                    });
                })
                .catch((error) => {
                    console.error("Error adding WatchList", error);
                });
        } 
        else if (req.method === 'DELETE') {
            // implement later
        }
    } catch {
        res.status(400).json({
            message: "Can't find any data..."
        });
    }
}