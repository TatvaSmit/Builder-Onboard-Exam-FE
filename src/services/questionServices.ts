import { axiosInstance } from "../config/axiosConfig";

const createQuestion = async (data: any) => {
  return await axiosInstance.post("/question/create", data);
};

const getAllQuestions = async (technology_id?: number) => {
  console.log(Boolean(technology_id));
  return await axiosInstance.get(`/question/getall?technology_id=${technology_id}`);
};

const getQuestion = async (id: number) => {
  return await axiosInstance.get(`question/getquestion/${id}`);
};

const getFullQuestion = async (id: number) => {
  return await axiosInstance.get(`question/getFullQuestion/${id}`);
};

const updateQuestion = async (id: number, data: any) => {
  return await axiosInstance.put(`question/update/${id}`, data);
};

export { createQuestion, getAllQuestions, updateQuestion, getQuestion, getFullQuestion };
