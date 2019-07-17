import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../models/questionModel';
import {AnswerModel} from '../../../models/answerModel';
import {ConnectionService} from '../../../services/connection.service';
import {NotificationService} from '../../../services/notification.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../services/data.service';

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

  known = false;

  owned = false;

  constructor(private connection: ConnectionService,
              public dataService: DataService,
              private notify: NotificationService,
              private route: ActivatedRoute) {
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
    if (this.route.snapshot.routeConfig.path === 'known') {
      this.known = true;
    }
    if (this.dataService.currentUser && (this.question.user === this.dataService.currentUser.username)) {
      this.owned = true;
    }
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

  markQuestion() {
    this.connection.markQuestion(this.question.id)
      .subscribe(value => {
        this.notify.showSuccess(this.question.title, 'Saved!');
        this.question = undefined;
      });
  }
}
