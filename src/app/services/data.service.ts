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

  private selectedCategory = 0;

  currentUser: UserModel;

  isAdmin: boolean;

  page: Pageable;

  constructor(private connection: ConnectionService,
              private auth: AuthService,
              private notify: NotificationService) {
    this.init();
  }

  init(): void {
    this.auth.isCurrentUserAdmin$.subscribe(value => this.isAdmin = value)
    this.tags$ = this.connection.getTags();
    this.auth.currentUser$
      .subscribe((user: UserModel) => this.currentUser = user);
    this.questions$ = this.connection.getQuestions();
  }

  next(): void {
    if (this.page && !this.page.last) {
      this.loadAll({
        page: this.page.pageNumber + 1,
        size: this.page.pageSize
      });
    } else
    if (this.selectedCategory === 0) {
      this.questions$ = this.connection.getQuestions();
    } else {
      this.questions$ = this.connection.getQuestionsByTagId(this.selectedCategory);
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
    if (this.currentUser) {
      this.page = undefined;
      this.questions$ = this.connection.loadKnownQuestions();
    } else {
      this.notify.showWarning('Must be logged', 'Unlogged');
    }
  }

  setCategory(category: number) {
    this.page = undefined;
    this.selectedCategory = category;
    this.next();
  }

  loadSingleQuestion(questionId: number): void {
    this.questions$ = this.connection.getQuestions(questionId);
  }

  loadAll(inputParams?): void {
    if (!inputParams) {
      inputParams = {
        page: 0,
        size: 10
      };
    }
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
