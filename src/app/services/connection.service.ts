import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QuestionModel} from '../models/questionModel';
import {AnswerModel} from '../models/answerModel';
import {TagModel} from '../models/tagModel';
import {Observable} from 'rxjs';
import {PageableModel} from '../models/pageableModel';
import {environment} from '../../environments/environment';
import {UserModel} from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  address: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(public http: HttpClient) {
    this.address = environment.address;
  }

  getQuestions(questionId?: number): Observable<QuestionModel[]> {
    if (questionId) {
      return this.http.get<QuestionModel[]>(this.address + 'questions/' + questionId, {headers: this.headers});
    } else {
      return this.http.get<QuestionModel[]>(this.address + 'questions/random', {headers: this.headers});
    }
  }

  getTags(): Observable<TagModel[]> {
    return this.http
      .get<TagModel[]>(
        this.address + 'tags');
  }

  getQuestionsByTagId(tagId: number): Observable<QuestionModel[]> {
    return this.http
      .get<QuestionModel[]>(
        this.address
        + 'tags/'
        + tagId
        + '/questions/random',
        {headers: this.headers});
  }

  sendNewQuestion(question: QuestionModel) {
    return this.http
      .post(
        this.address
        + 'questions',
        JSON.stringify(question),
        {headers: this.headers});
  }

  sendNewAnswer(answer: AnswerModel, questionId: number) {
    return this.http
      .post(
        this.address
        + 'questions/' + questionId + '/answers',
        JSON.stringify(answer),
        {headers: this.headers});
  }

  sendNewTag(tag: TagModel) {
    return this.http
      .post(
        this.address
        + 'tags',
        JSON.stringify(tag),
        {headers: this.headers});
  }

  deleteQuestion(questionID: number) {
    return this.http
      .delete(
        this.address
        + 'questions/'
        + questionID,
        {headers: this.headers});
  }

  deleteAnswer(answerID: number) {
    return this.http.delete(this.address
      + 'answers/'
      + answerID,
      {headers: this.headers});
  }

  editQuestion(question: QuestionModel) {
    return this.http.put(this.address
      + 'questions/'
      + question.id,
      JSON.stringify(question),
      {headers: this.headers});
  }

  editAnswer(answer: AnswerModel) {
    console.log(answer);
    return this.http.put(this.address
      + 'answers/'
      + answer.id,
      JSON.stringify(answer),
      {headers: this.headers});
  }

  getAllQuestions(inputParams?): Observable<PageableModel> {
    return this.http.get<PageableModel>(this.address +
      'questions/',
      {headers: this.headers,
        params: inputParams ? inputParams : null});
  }

  acceptQuestion(id: number) {
    return this.http.post(this.address +
    'admin/accept/'
      + id,
      {},
      {headers: this.headers});
  }

  markQuestion(id: number) {
    return this.http.post(this.address +
      'users/mark_question/' + id,
      {},
      {headers: this.headers}
    );
  }

  loadKnownQuestions(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(this.address +
      'users/known_questions/',
      {headers: this.headers}
    );
  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.address +
    'admin/users/',
      {headers: this.headers});
  }

  getQuestionsForUser(username: string): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(this.address +
    'admin/users/' + username + '/questions',
      {headers: this.headers});
  }

  getAnswersForUser(username: string): Observable<AnswerModel[]> {
    return this.http.get<AnswerModel[]>(this.address +
      'admin/users/' + username + '/answers',
      {headers: this.headers});
  }
}
