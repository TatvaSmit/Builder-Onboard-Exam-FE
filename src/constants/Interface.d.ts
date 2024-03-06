interface IQuestionData {
  question: string | null;
  points: number | null;
  technology_id: number | null;
  options: { name: string }[];
  answer: string | null;
}

interface TechnologyList {
  id: number;
  name: string;
}

interface ITechnology {
  name: string;
  id: number;
  duration: number;
  no_of_questions: number;
}

interface IPath {
  to: string;
  displayName: string;
}

interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export { IQuestionData, TechnologyList, ITechnology, IUser, IPath };
