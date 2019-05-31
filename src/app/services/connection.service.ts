import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {QuestionModel} from '../models/questionModel';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  address = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get(this.address + 'questions');
  }

  getTags() {
    return this.http.get(this.address + 'tags');
  }

  getQuestionsByTagName(tagName: string) {
    return this.http.get(this.address + tagName + '/questions');
  }

  sendNewQuestion(question: QuestionModel) {
    console.log(JSON.stringify(question))
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.address + 'questions', JSON.stringify(question), {headers: headers});
  }

}
