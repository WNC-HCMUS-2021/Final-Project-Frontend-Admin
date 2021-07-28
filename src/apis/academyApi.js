import axios from 'axios';

// get list academy (lấy danh sách academy theo filter)
export const getListAcademy = async (params) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    const url = process.env.REACT_APP_API_BASE_URL + '/admin/academy';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        params
    }
    const res = await axios.get(url, config);
    return res;
}

// delete academy (xoá academy)
export const deleteAcademy = async (id) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    const url = process.env.REACT_APP_API_BASE_URL + `/admin/academy/${id}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
    const res = await axios.delete(url, config);
    return res;
}

// create new academy (thêm academy)
export const createAcademy = async (data) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    console.log(token);
    const url = process.env.REACT_APP_API_BASE_URL + '/admin/academy';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
    const res = await axios.post(url, data, config);
    return res;
}

// update academy (cập nhật academy)
export const updateAcademy = async (id, data) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    const url = process.env.REACT_APP_API_BASE_URL + `/admin/academy/${id}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
    const res = await axios.patch(url, data, config);
    return res;
}

// detail academy (chi tiết academy)
export const detailAcademy = async (id) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    const url = process.env.REACT_APP_API_BASE_URL + `/admin/academy/${id}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
    const res = await axios.get(url, config);
    return res;
}

// create outline academy


// update outline academy