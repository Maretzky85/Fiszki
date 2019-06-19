import {Component, OnInit} from '@angular/core';
import {ConnectionService} from '../../services/connection.service';
import {QuestionModel} from '../../models/questionModel';
import {DataSharingService} from '../../services/data-sharing.service';
import {NotificationService} from '../../services/notification.service';
import {ActivatedRoute} from '@angular/router';
import {PageableModel} from '../../models/pageableModel';
import {HttpParams} from '@angular/common/http';
import {HttpParamsOptions} from '@angular/common/http/src/params';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionList: QuestionModel[] = [];

  questionId: number;

  notification = 'loading';

  params = {
    'page': 0,
    'size': 10
  };

  logged;

  admin = false;

  maxPage;

  constructor(private connection: ConnectionService,
              private dataSharing: DataSharingService,
              private notify: NotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dataSharing.currentUser.subscribe(value => this.logged = !!value);
    this.questionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.route.snapshot.routeConfig.path === 'admin') {
      this.admin = true;
      if (!this.logged) {
        this.notification = 'Only for logged Users';
        return;
      }
      this.loadAllQuestions();
    } else {
      this.dataSharing.currentCategory.subscribe((category) => {
        if (this.questionId) {
          this.loadQuestionById(this.questionId);
          delete this.questionId;
        } else {
          this.loadNextQuestion(category);
        }
      }, (error1 => this.notify.handleError(error1)));
    }
  }

  loadAllQuestions() {
    this.connection.getAllQuestions(this.params).subscribe(
      (value: PageableModel) => {
        this.maxPage = value.totalPages;
        this.questionList = value.content;
      }
    );
  }

  loadNext() {
    this.dataSharing.currentCategory.subscribe(category => this.loadNextQuestion(category)).unsubscribe();
  }

  loadQuestionById(questionId: number) {
    this.connection.getQuestions(questionId)
      .subscribe(
        (value: QuestionModel[]) => this.questionList = value
      );
  }

  loadNextQuestion(category?: number) {
    if (category === 0) {
      this.connection.getQuestions()
        .subscribe((value: QuestionModel[]) => {
            this.questionList = value;
            this.notification = 'No questions found';
          },
          (error) => this.notify.handleError(error));
    } else {
      this.connection.getQuestionsByTagId(category).subscribe((value: QuestionModel[]) => {
          this.questionList = value;
          this.notification = 'No questions found';
        },
        (error) => this.notify.handleError(error)
      );
    }
  }

  loadAllNext() {
    if (this.params.page < this.maxPage) {
      this.params.page = this.params.page + 1;
    }
    this.loadAllQuestions();
  }

  loadAllPrev() {
    if (this.params.page > 0) {
      this.params.page = this.params.page - 1;
    }
    this.loadAllQuestions();
  }
}
