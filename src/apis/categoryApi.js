import axios from 'axios';


// create new category (thêm occupation)
export const createCategory = async (data) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    console.log(token);
    const url = process.env.REACT_APP_API_BASE_URL + '/admin/academy-category';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
    const res = await axios.post(url, data, config);
    return res;
}

// update category (cập nhật category)
export const updateCategory = async (data) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    console.log(data);
    const url = process.env.REACT_APP_API_BASE_URL + '/admin/academy-category';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
    const res = await axios.put(url, data, config);
    return res;
}

// get list category (lấy danh sách category theo filter)
export const getListCategory = async (params) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    const url = process.env.REACT_APP_API_BASE_URL + '/admin/academy-category';
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

// delete category (xoá category)
export const deleteCategory = async (data) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    const url = process.env.REACT_APP_API_BASE_URL + '/admin/academy-category';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        data: data
    }
    const res = await axios.delete(url, config);
    return res;
}