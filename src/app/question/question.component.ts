import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../services/connection.service';
import { QuestionModel } from '../models/questionModel';
import {CategoryDataSharingService} from '../services/category-data-sharing.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionList;

  category: string;

  constructor(private connection: ConnectionService,
              private categorySharingService: CategoryDataSharingService) { }

ngOnInit() {
  this.categorySharingService.currentMessage.subscribe((category) => {
    this.category = category;
    this.loadQuestions(category);
  }, (error1 => console.log(error1)));

  this.loadQuestions();
  }

  loadQuestions(category?: string) {
    if (this.category === 'home') {
      this.connection.getQuestions()
        .subscribe((value: QuestionModel) => {
            this.questionList = value;
          },
          (error) => console.error(error));
    } else {
      this.connection.getQuestionsByTagName(this.category).subscribe((value: QuestionModel) => {
          this.questionList = value;
        },
        (error) => console.error(error));
    }
  }

}
