import axios from "axios";
import firebase from "firebase";
import 'firebase/firestore'
const USER_URL = `http://localhost:3000/api/user`;




export const watchlist = async (coinName,hash) => {

    const res1 = await addWatchListToDB(hash, coinName);
    if (res1.status === 200) {
        alert("add successful");
    }
    // return false so page isn't refreshed
    return false;
}