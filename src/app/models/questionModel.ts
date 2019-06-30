import {Answer, ResponseInterface, QuestionTag} from './responseInterface';
import {UserModel} from './UserModel';

export class QuestionModel implements ResponseInterface {
  answers: Answer[];
  id: number;
  question: string;
  title: string;
  tags: QuestionTag[];
  user: UserModel;
  accepted: boolean;
}
