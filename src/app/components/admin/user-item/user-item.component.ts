import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../models/UserModel';
import {QuestionModel} from '../../../models/questionModel';
import {Observable} from 'rxjs';
import {ConnectionService} from '../../../services/connection.service';
import {tap} from 'rxjs/operators';
import {AnswerModel} from '../../../models/answerModel';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() user: UserModel;

  userQuestions: Observable<QuestionModel[]>;

  userAnswers: Observable<AnswerModel[]>;

  questionsCount: number;

  answersCount: number;

  activityHidden = true;

  showingQuestions = true;

  loaded = false;

  userIsAdmin = false;

  constructor(private connection: ConnectionService) {
  }

  ngOnInit() {
    this.userIsAdmin = this.isAdmin();
  }

  isAdmin(): boolean {
    return !!this.user.roles.find(value => value.role === 'ADMIN');
  }

  loadActivities() {
    this.loaded = true;
    this.userQuestions = this.connection.getQuestionsForUser(this.user.username).pipe(
      tap((x: QuestionModel[]) => this.questionsCount = x.length)
    );
    this.userAnswers = this.connection.getAnswersForUser(this.user.username).pipe(
      tap<AnswerModel[]>(x => this.answersCount = x.length)
    );
  }

  showAnswer() {
    if (!this.activityHidden && !this.showingQuestions) {
      this.activityHidden = true;
      console.log(this.activityHidden);
      return;
    }
    this.activityHidden = false;
    this.showingQuestions = false;
  }

  showQuestion() {
    if (!this.activityHidden && this.showingQuestions) {
      this.activityHidden = true;
      return;
    }
    this.activityHidden = false;
    this.showingQuestions = true;
  }

  makeAdmin() {
    if (this.user.roles.find(value => value.role === 'ADMIN')) {
      this.user.roles = this.user.roles.filter(value => value.role !== 'ADMIN');
    } else {
      this.user.roles.push({id: 1, role: 'ADMIN'});
    }
    this.connection.makeAdmin(this.user).subscribe((value: UserModel) => {this.user = value; this.userIsAdmin = this.isAdmin(); });
  }
}
