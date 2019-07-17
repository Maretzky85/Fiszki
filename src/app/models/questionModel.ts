import {Answer, QuestionTag, ResponseInterface} from './responseInterface';

export class QuestionModel implements ResponseInterface {
  answers: Answer[];
  id: number;
  question: string;
  title: string;
  tags: QuestionTag[];
  user: string;
  accepted: boolean;
}
