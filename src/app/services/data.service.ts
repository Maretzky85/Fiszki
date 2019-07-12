import {Injectable} from '@angular/core';
import {TagModel} from '../models/tagModel';
import {ConnectionService} from './connection.service';
import {NotificationService} from './notification.service';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {UserModel} from '../models/UserModel';
import {QuestionModel} from '../models/questionModel';
import {Pageable, PageableModel} from '../models/pageableModel';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  questions$: Observable<QuestionModel[]>;

  tags$: Observable<TagModel[]>;

  private category = 0;

  user: UserModel;

  isAdmin: boolean;

  page: Pageable;

  constructor(private connection: ConnectionService,
              private auth: AuthService,
              private notify: NotificationService) {
    this.init();
  }

  init(): void {
    this.isAdmin = this.auth.isAdmin;
    this.tags$ = this.connection.getTags();
    this.auth.currentUser$
      .subscribe((user: UserModel) => this.user = user);
    this.questions$ = this.connection.getQuestions();
  }

  next(): void {
    if (this.page && !this.page.last) {
      this.loadAll({
        page: this.page.pageNumber + 1,
        size: this.page.pageSize
      });
    } else
    if (this.category === 0) {
      this.questions$ = this.connection.getQuestions();
    } else {
      this.questions$ = this.connection.getQuestionsByTagId(this.category);
    }
  }

  prev() {
    if (this.page && !this.page.first) {
      this.loadAll({
        page: this.page.pageNumber - 1,
        size: this.page.pageSize
      });
    }
  }

  knownQuestions() {
    if (this.user) {
      this.questions$ = this.connection.loadKnownQuestions();
    } else {
      this.notify.showWarning('Must be logged', 'Unlogged');
    }
  }

  setCategory(category: number) {
    this.page = undefined;
    this.category = category;
    this.next();
  }

  loadSingleQuestion(questionId: number): void {
    this.questions$ = this.connection.getQuestions(questionId);
  }

  loadAll(inputParams?): void {
    this.questions$ = this.connection.getAllQuestions(inputParams)
      .pipe(
        map((page: PageableModel) => {
          this.page = page.pageable;
          this.page.last = page.last;
          this.page.first = page.first;
          return page.content;
        }));
  }
}
