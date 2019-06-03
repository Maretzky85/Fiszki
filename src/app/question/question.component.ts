import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../services/connection.service';
import { QuestionModel } from '../models/questionModel';
import {CategoryDataSharingService} from '../services/category-data-sharing.service';
import {ToastrService} from 'ngx-toastr';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionList;

  category: number;

  constructor(private connection: ConnectionService,
              private categorySharingService: CategoryDataSharingService,
              private notify: NotificationService) { }

ngOnInit() {
  this.categorySharingService.currentMessage.subscribe((category) => {
    this.category = category;
    this.loadQuestions(category);
  }, (error1 => console.log(error1)));

  this.loadQuestions();
  }

  loadQuestions(category?: number) {
    if (this.category === 0) {
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
