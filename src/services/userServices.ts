import { axiosInstance } from "../config/axiosConfig";

const login = async (data: any) => {
  return await axiosInstance.post("user/login", data);
};

const getLoggedInUser = async () => {
  return await axiosInstance.get("user/getUserDetails");
};

const register = async (data: any) => {
  return await axiosInstance.post("user/create", data);
};

export { login, register, getLoggedInUser };
