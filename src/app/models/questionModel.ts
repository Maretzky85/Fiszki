import {Answer, ResponseInterface, QuestionTag} from './responseInterface';

export class QuestionModel implements ResponseInterface {
  answers: Answer[];
  id: number;
  question: string;
  title: string;
  tags: QuestionTag[];
}
