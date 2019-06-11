import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnswerModel} from '../../models/answerModel';
import {ConnectionService} from '../../services/connection.service';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';
import {DataSharingService} from '../../services/data-sharing.service';

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.css']
})
export class AnswerItemComponent implements OnInit {

  @Input() answer: AnswerModel;

  @Output() emitter = new EventEmitter();

  editMode = false;

  logged;

  constructor(private connection: ConnectionService,
              private dataSharing: DataSharingService,
              private notify: NotificationService) {
  }

  saveEditedAnswer() {
    this.editMode = !this.editMode;
    this.connection.editAnswer(this.answer).subscribe(
      (value: AnswerModel) => {
        this.notify.showSuccess(value.answer, 'Saved');
      },
      error1 => this.notify.handleError(error1)
    );
  }

  deleteAnswer() {
    this.connection.deleteAnswer(this.answer.id).subscribe(
      (answer: AnswerModel) => {
        this.notify.showWarning('Deleted', answer.answer);
        this.notifyOnChange();
      },
      error1 => this.notify.handleError(error1)
    );
  }

  notifyOnChange() {
    this.emitter.emit();
  }

  ngOnInit() {
    this.dataSharing.currentUser.subscribe(user => this.logged = !!user);
  }

}
