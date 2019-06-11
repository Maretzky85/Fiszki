import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnswerModel} from '../models/answerModel';
import {ConnectionService} from '../services/connection.service';
import {NotificationService} from '../services/notification.service';
import {ErrorModel} from '../models/errorModel';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.css']
})
export class AnswerItemComponent implements OnInit {

  @Input() answer: AnswerModel;

  @Output() emitter = new EventEmitter<AnswerModel>();

  editMode = false;

  user;

  constructor(private connection: ConnectionService,
              private authorization: AuthService,
              private notify: NotificationService) { }

  saveEditedAnswer() {
    this.editMode = !this.editMode;
    this.connection.editAnswer(this.answer).subscribe(
      (value: AnswerModel ) => {
        this.notify.showSuccess(value.answer, 'Saved'); },
      (error1: ErrorModel ) => {
        this.notify.handleError(error1); } );
  }

  deleteAnswer() {
    this.connection.deleteAnswer(this.answer.id).subscribe(
      (value: AnswerModel) => {
        this.notify.showWarning('Deleted', value.answer);
        this.changeNotify(); },
      (error1: ErrorModel ) => {
        this.notify.handleError(error1); });
  }

  changeNotify() {
    this.emitter.emit();
  }

  ngOnInit() {
    this.authorization.loggedUser.subscribe(user => this.user = user);
  }

}
