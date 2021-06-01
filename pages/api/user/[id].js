import db from "../../../utils/db"

export default async (req, res) => {
    const { id } = req.query;

    try {
        if (req.method === 'GET') {
            const user = (await db.collection('users').doc(id).get()).data();
            res.status(200).json(user);
        } else if (req.method === 'POST') {
            await db.collection('users').doc(id).set({
                name: req.body.name,
                email: req.body.email
            }, { merge: true }).then(() => {
                res.status(200).json({
                    message: "User added to database"
                });
            }).catch((error) => {
                console.error("Error adding user to database", error);
            });
        } else if (req.method === 'DELETE') {
            await db.collection('users').doc(id).delete();
        }

    } catch {
        res.status(400).json({
            message: "Can't find any data..."
        });
    }
}