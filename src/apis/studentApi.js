import { axiosInstance } from "./axiosConfig";

// get list student (lấy danh sách student theo filter)
export const getListStudent = async (params) => {
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

// delete student (xoá student)
export const deleteStudent = async (id) => {
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
