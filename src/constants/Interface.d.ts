interface IQuestionData {
  question: string | null;
  points: number | null;
  technology_id: number | null;
  options: { name: string }[];
  answer: string | null;
  optionIndex: number | null;
}

interface TechnologyList {
  id: number;
  name: string;
}

export { IQuestionData, TechnologyList };
