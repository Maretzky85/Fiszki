import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../models/UserModel';
import {QuestionModel} from '../../../models/questionModel';
import {Observable} from 'rxjs';
import {ConnectionService} from '../../../services/connection.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() user: UserModel;

  userQuestions: Observable<QuestionModel[]>;

  questionsCount: number;

  questionsHidden = true;

  loaded = false;

  constructor(private connection: ConnectionService) { }

  ngOnInit() {
  }

  loadActivities() {
    this.loaded = true;
    this.userQuestions = this.connection.getQuestionsForUser(this.user.username).pipe(
      tap((x: QuestionModel[] ) => this.questionsCount = x.length)
    );
  }

}
