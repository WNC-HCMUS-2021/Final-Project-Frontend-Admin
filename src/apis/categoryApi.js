import { axiosInstance } from "./axiosConfig";

// create new category (thêm occupation)
export const createCategory = async (data) => {
  // const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
  // console.log(token);
  // const url = process.env.REACT_APP_API_BASE_URL + '/admin/academy-category';
  // const config = {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token
  //     }
  // }
  const res = await axiosInstance.post("/admin/academy-category", data);
  return res;
};

// update category (cập nhật category)
export const updateCategory = async (id, data) => {
  // const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
  // const url = process.env.REACT_APP_API_BASE_URL + `/admin/academy-category/${id}`;
  // const config = {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token
  //     }
  // }
  const res = await axiosInstance.patch(`/admin/academy-category/${id}`, data);
  return res;
};

// get list category (lấy danh sách category theo filter)
export const getListCategory = async (params) => {
  // const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
  // const url = process.env.REACT_APP_API_BASE_URL + '/admin/academy-category';
  // const config = {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token
  //     },
  //     params
  // }
  const res = await axiosInstance.get("/admin/academy-category");
  return res;
};

// delete category (xoá category)
export const deleteCategory = async (id) => {
  // const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
  // const url = process.env.REACT_APP_API_BASE_URL + `/admin/academy-category/${id}`;
  // const config = {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token
  //     }
  // }
  const res = await axiosInstance.delete(`/admin/academy-category/${id}`);
  return res;
};
