export interface ResponseInterface  {
  id: number;
  title: string;
  question: string;
  answers: Answer[];
  tags: QuestionTag[];
}

export interface QuestionTag {
  id: number;
  tagName: string;
}

export interface Answer {
  id: number;
  answer: string;
}

