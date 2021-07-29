import { axiosInstance } from "./axiosConfig";

export const authLogin = async (data) => {
  //   const url = process.env.REACT_APP_API_BASE_URL + "/auth";
  // const config = {
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // }
  const res = await axiosInstance.post("/auth", data);
  return res;
};
