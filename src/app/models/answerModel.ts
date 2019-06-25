import { Answer } from './responseInterface';
import {UserModel} from './UserModel';

export class AnswerModel implements Answer {
  answer: string;
  id: number;
  user: UserModel;
}
