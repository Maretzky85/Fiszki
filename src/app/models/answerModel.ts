import {Answer} from './responseInterface';

export class AnswerModel implements Answer {
  answer: string;
  id: number;
  user: string;
  question_id: number;
}
