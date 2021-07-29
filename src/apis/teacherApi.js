import { axiosInstance } from "./axiosConfig";

// get list teacher (lấy danh sách teacher theo filter)
export const getListTeacher = async (params) => {
  // const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
  // const url = process.env.REACT_APP_API_BASE_URL + '/admin/user';
  // const config = {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token
  //     },
  //     params
  // }
  const res = await axiosInstance.get("/admin/user");
  return res;
};

// delete teacher (xoá teacher)
export const deleteTeacher = async (id) => {
  // const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
  // const url = process.env.REACT_APP_API_BASE_URL + `/admin/user/${id}`;
  // const config = {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token
  //     }
  // }
  const res = await axiosInstance.delete(`/admin/user/${id}`);
  return res;
};

// create new category (thêm occupation)
export const createTeacher = async (data) => {
  // const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
  // console.log(token);
  // const url = process.env.REACT_APP_API_BASE_URL + '/admin/user';
  // const config = {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token
  //     }
  // }
  const res = await axiosInstance.post("/admin/user", data);
  return res;
};

// get list academy of teacher
export const getListAcademy = async (id) => {
  // const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
  // const url = process.env.REACT_APP_API_BASE_URL + `/admin/user/${id}/academy`;
  // const config = {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token
  //     }
  // }
  const res = await axiosInstance.get(`/admin/user/${id}/academy`);
  return res;
};
