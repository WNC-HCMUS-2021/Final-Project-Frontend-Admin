import { axiosInstance } from "./axiosConfig";

// get list teacher (lấy danh sách teacher theo filter)
export const getListTeacher = async (params) => {
  const res = await axiosInstance.get("/admin/user");
  return res;
};

// delete teacher (xoá teacher)
export const deleteTeacher = async (id) => {
  const res = await axiosInstance.delete(`/admin/user/${id}`);
  return res;
};

// create new category (thêm occupation)
export const createTeacher = async (data) => {
  const res = await axiosInstance.post("/admin/user", data);
  return res;
};

// get list academy of teacher
export const getListAcademy = async (id) => {
  const res = await axiosInstance.get(`/admin/user/${id}/academy`);
  return res;
};

// detail teacher
export const detailTeacher = async (id) => {
  const res = await axiosInstance.get(`/admin/user/${id}`);
  return res;
};

// detail teacher
export const editTeacher = async (data) => {
  const res = await axiosInstance.put(`/admin/user/`, data);
  return res;
};

// change password
export const changePWTeacher = async (data) => {
  const res = await axiosInstance.put(`/admin/user/change-password`, data);
  return res;
};
