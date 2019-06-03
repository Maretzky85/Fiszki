import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../models/questionModel';
import {AnswerModel} from '../models/answerModel';
import {ConnectionService} from '../services/connection.service';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css']
})
export class QuestionItemComponent implements OnInit {

  @Input() question: QuestionModel;

  hidden = true;

  disabled = false;

  editMode = false;

  newAnswer: AnswerModel;

  constructor(private connection: ConnectionService,
              private notify: NotificationService) { }

  showAnswer() {
    this.hidden = false;
  }

  ngOnInit() {}

  hasNewAnswer() {
    if (!this.disabled) {
      this.newAnswer = new AnswerModel();
    }
  }

  updateForChange() {
    this.disabled = true;
    this.connection.getQuestions(this.question.id).subscribe(
      (value: QuestionModel ) => {
        this.disabled = false;
        this.question = value;
      });
  }

  submitQuestion() {
    if (this.disabled) {
      return;
    }
    this.disabled = true;
    this.editMode = false;
    this.connection.editQuestion(this.question).subscribe((value: QuestionModel ) => {
      console.log(value);
      this.question = value;
      this.disabled = false;
      this.notify.showSuccess(value.title, 'Saved!');
    }, error1 => this.notify.showError('', 'Error'));
  }

  submitAnswer() {
    if (this.disabled) {
      return;
    }
    this.disabled = true;
    this.connection.sendNewAnswer(this.newAnswer, this.question.id).subscribe(
      (value: QuestionModel ) => {
        this.hidden = true;
        this.newAnswer = null;
        console.log(value);
        this.notify.showSuccess(value.title, 'saved');
        this.updateForChange();
    }, error1 => {this.notify.showWarning('', 'error'); });
  }

  delete() {
    this.connection.deleteQuestion(this.question.id).subscribe((value: QuestionModel )=> {
      this.notify.showWarning(value.title, 'deleted');
      this.question = null;
    }, error1 => {
      this.notify.showError('', 'Error');
    });
  }

}
