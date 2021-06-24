import db from "../../../utils/db"

export default async (req, res) => {

    try {
        if (req.method === 'GET') {
            let idList = [];
            db.collection("users").get().then((querySnaphot) => {
                querySnaphot.forEach((doc) => {
                    idList.push(doc.id);  
                })
                res.status(200).json(idList);
            });
        } 
        else if (req.method === 'POST') {

        } 
        else if (req.method === 'DELETE') {

        }

    } catch {
        res.status(400).json({
            message: "Can't find any data..."
        });
    }
}