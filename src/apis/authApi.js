import axios from 'axios';

export const authLogin = async (data) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/auth/login';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await axios.post(url, data, config);
    return res;
}