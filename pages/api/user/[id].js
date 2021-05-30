import db from "../../../utils/db"

export default async (req, res) => {
    const { id } = req.query;

    try {
        if (req.method === 'GET') {
            const user = (await db.collection('users').doc(id).get()).data();
            res.status(200).json(user);
        } else if (req.method === 'PUT') {
            /* 
              * We can leave this blank for now
              * Will update it once we define what exactly we want to do
            */
        } else if (req.method === 'DELETE') {
            await db.collection('users').doc(id).delete();
        }

    } catch {
        res.status(400).json({
            message: "Can't find any data..."
        });
    }
}