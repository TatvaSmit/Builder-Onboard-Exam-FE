import { axiosInstance } from "../config/axiosConfig";

const createTechnology = async (data: any) => {
  return await axiosInstance.post("/technology/create", data);
};

const getTechnology = async (id: number) => {
  return await axiosInstance.get(`/technology/getTechnology/${id}`);
};

const getAllTechnologies = async () => {
  return await axiosInstance.get("technology/getAll");
};

const updateTechnology = async (id: number, data: any) => {
  return await axiosInstance.put(`technology/update/${id}`, data);
};

export { createTechnology, updateTechnology, getAllTechnologies, getTechnology };
