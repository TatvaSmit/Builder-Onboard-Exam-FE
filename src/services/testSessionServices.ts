import { axiosInstance } from "../config/axiosConfig";

const createExam = async (data: any) => {
  return await axiosInstance.post("test/create", data);
};

const getTest = async (id: number) => {
  return await axiosInstance.get(`test/gettest/${id}`);
};

const submitExam = async (id: number, data: any) => {
  return await axiosInstance.put(`test-performance/update/${id}`, data);
};

const fillTheAnswer = async (data: any) => {
  return await axiosInstance.post("test-stats/create", data);
};

const updateAnswer = async (id: number, data: any) => {
  return await axiosInstance.put(`test-stats/update/${id}`, data);
};

export { submitExam, createExam, getTest, fillTheAnswer, updateAnswer };
