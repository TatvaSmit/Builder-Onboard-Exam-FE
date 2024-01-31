import { axiosInstance } from "../config/axiosConfig";

const createQuestion = async (data: any) => {
  return await axiosInstance.post("/question/create", data);
};

const getAllQuestions = async () => {
  return await axiosInstance.get("/question/getall");
};

const getQuestion = async (id: number) => {
  return await axiosInstance.get(`question/getquestion/${id}`);
};

const updateQuestion = async (id: number, data: any) => {
  return await axiosInstance.put(`question/update/${id}`, data);
};

export { createQuestion, getAllQuestions, updateQuestion, getQuestion };
