import axios from 'axios'

const USER_URL = `http://localhost:3000/api/user`;

export const getUser = async (userID) => {
    const res = await axios.get(`${USER_URL}/${userID}`);
    return {
        data: res.data,
        status: res.status
    };
}

export const createUser = async (hash, userEmail, userName) => {
    const res = await axios.post(`${USER_URL}/${hash}`, {
        email: userEmail,
        name: userName
    });
    return res.data;
}

export const deleteUser = async (userID) => {
    const res = await axios.delete(`${USER_URL}/${userID}`);
    return res.data;
}