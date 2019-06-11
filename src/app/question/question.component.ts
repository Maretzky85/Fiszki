import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../services/connection.service';
import { QuestionModel } from '../models/questionModel';
import {CategoryDataSharingService} from '../services/category-data-sharing.service';
import {NotificationService} from '../services/notification.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionList: QuestionModel[] = [];

  questionId: number;

  notification = 'loading';

  constructor(private connection: ConnectionService,
              private categorySharingService: CategoryDataSharingService,
              private notify: NotificationService,
              private route: ActivatedRoute) { }

ngOnInit() {
    this.questionId = Number(this.route.snapshot.paramMap.get('id'));

    this.categorySharingService.currentMessage.subscribe((category) => {
    if (this.questionId) {
      this.loadSingleQuestion(this.questionId);
      delete this.questionId;
    } else {
      this.loadAllQuestions(category);
    }
    }, (error1 => console.log(error1)));
  }

  loadSingleQuestion(questionId: number) {
    this.connection.getQuestions(questionId)
      .subscribe(
        (value: QuestionModel ) => {
          this.questionList = [];
          this.questionList.push(value);
          console.log(this.questionList);
        }
      );
  }

  loadAllQuestions(category?: number) {
    if (category === 0) {
      this.connection.getQuestions()
        .subscribe((value: QuestionModel[]) => {
            this.questionList = value;
          },
          (error) => console.error(error));
    } else {
      this.connection.getQuestionsByTagName(category).subscribe((value: QuestionModel[]) => {
          this.questionList = value;
        },
        (error) => console.error(error));
    }
  }

}
