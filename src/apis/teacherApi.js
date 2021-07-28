import axios from 'axios';

// get list teacher (lấy danh sách teacher theo filter)
export const getListTeacher = async (params) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    const url = process.env.REACT_APP_API_BASE_URL + '/admin/user';
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

// delete teacher (xoá teacher)
export const deleteTeacher = async (id) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    const url = process.env.REACT_APP_API_BASE_URL + `/admin/user/${id}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
    const res = await axios.delete(url, config);
    return res;
}

// create new category (thêm occupation)
export const createTeacher = async (data) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    console.log(token);
    const url = process.env.REACT_APP_API_BASE_URL + '/admin/user';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
    const res = await axios.post(url, data, config);
    return res;
}

// get list academy of teacher
export const getListAcademy = async (id) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    const url = process.env.REACT_APP_API_BASE_URL + `/admin/user/${id}/academy`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
    const res = await axios.get(url, config);
    return res;
}