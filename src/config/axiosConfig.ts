import axios from "axios";

export const axiosInstance = axios.create({ baseURL: "http://localhost:5000/" });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token")!);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error: Error) => {
    Promise.reject(error);
  }
);
