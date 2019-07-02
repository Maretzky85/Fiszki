import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QuestionModel} from '../models/questionModel';
import {AnswerModel} from '../models/answerModel';
import {TagModel} from '../models/tagModel';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  // address = 'https://fiszkiapi.sikoramarek.com/';
  address = 'http://localhost:8080/';
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(public http: HttpClient) {
  }

  getQuestions(question_id?: number) {
    if (question_id) {
      return this.http.get(this.address + 'questions/' + question_id, {headers: this.headers});
    } else {
      return this.http.get(this.address + 'questions/random', {headers: this.headers});
    }
  }

  getTags() {
    return this.http
      .get(
        this.address + 'tags');
  }

  getQuestionsByTagId(tagId: number) {
    return this.http
      .get(
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

  getAllQuestions(inputParams?) {
    return this.http.get(this.address +
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

  loadKnownQuestions() {
    return this.http.get(this.address +
      'users/known_questions/',
      {headers: this.headers}
    );
  }
}
