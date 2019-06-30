import {Component, Input, OnInit, Output} from '@angular/core';
import {QuestionModel} from '../../../models/questionModel';
import {AnswerModel} from '../../../models/answerModel';
import {ConnectionService} from '../../../services/connection.service';
import {NotificationService} from '../../../services/notification.service';
import {AuthService} from '../../../services/auth.service';
import {DataSharingService} from '../../../services/data-sharing.service';
import {HttpHeaderResponse, HttpResponse, HttpResponseBase} from '@angular/common/http';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css']
})
export class QuestionItemComponent implements OnInit {

  @Input() question: QuestionModel;

  hidden = true;

  editMode = false;

  newAnswer: AnswerModel;

  logged = false;

  adminLogged = false;

  constructor(private connection: ConnectionService,
              private dataSharing: DataSharingService,
              private notify: NotificationService) {
  }

  showAnswer() {
    this.hidden = false;
  }

  acceptQuestion() {
    this.connection.acceptQuestion(this.question.id)
      .subscribe((question: QuestionModel) => {
          this.question = question;
          this.notify.showSuccess(question.title, 'Accepted');
        }
      );
  }

  ngOnInit() {
    this.dataSharing.admin.subscribe(value => this.adminLogged = value);
    this.dataSharing.currentUser.subscribe(user => this.logged = !!user);
  }

  hasNewAnswer() {
    this.newAnswer = new AnswerModel();
  }

  update() {
    this.connection.getQuestions(this.question.id).subscribe(
      (value: QuestionModel[]) => {
        console.log(value);
        this.question = value[0];
      });
    this.hidden = false;
  }

  submitQuestion() {
    this.editMode = false;
    this.connection.editQuestion(this.question).subscribe((value: QuestionModel) => {
        this.question = value;
        this.notify.showSuccess(value.title, 'Saved!');
      }, error1 => this.notify.handleError(error1)
    );
  }

  submitAnswer() {
    this.connection.sendNewAnswer(this.newAnswer, this.question.id).subscribe(
      (value: QuestionModel) => {
        this.hidden = true;
        this.newAnswer = null;
        this.notify.showSuccess(value.title, 'saved');
        this.update();
      }, error1 => this.notify.handleError(error1)
    );
  }

  delete() {
    this.connection.deleteQuestion(this.question.id).subscribe((value: QuestionModel) => {
        this.notify.showWarning(value.title, 'deleted');
        this.question = null;
      }, error1 => this.notify.handleError(error1)
    );
  }

}
