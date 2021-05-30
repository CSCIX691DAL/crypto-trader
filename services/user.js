import axios from 'axios'

const USER_URL = `http://localhost:3000/api/user`;

export const getUser = async (userID) => {
    const res = await axios.get(`${USER_URL}/${userID}`);
    return res.data;
}

export const deleteUser = async (userID) => {
    const res = await axios.delete(`${USER_URL}/${userID}`);
    return res.data;
}