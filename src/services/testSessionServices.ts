import { axiosInstance } from "../config/axiosConfig";

const createExam = async (id: number) => {
  return await axiosInstance.post("test/create", id);
};

const getTest = async (id: number) => {
  return await axiosInstance.get(`test/gettest/${id}`);
};

const submitExam = async (id: number, data: any) => {
  return await axiosInstance.put(`test-performance/update/${id}`, data);
};

const submitAnswer = async (id: number, data: any) => {
  if (id) {
    return await axiosInstance.put(`test-stats/update/${id}`, data);
  } else {
    return await axiosInstance.post("test-stats/create", data);
  }
};

export { submitExam, createExam, getTest, submitAnswer };
