import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../services/connection.service';
import { QuestionModel } from '../models/questionModel';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionList;

  constructor(private connection: ConnectionService) { }

  ngOnInit() {
    this.connection.getQuestions()
      .subscribe((value: QuestionModel) => {
          this.questionList = value;
          console.log(value);
        },
        (error) => console.error(error));
  }

}
