import {Inject, Injectable} from '@angular/core';
import {TagModel} from '../models/tagModel';
import {ConnectionService} from './connection.service';
import {NotificationService} from './notification.service';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {UserModel} from '../models/UserModel';
import {QuestionModel} from '../models/questionModel';
import {Pageable, PageableModel} from '../models/pageableModel';
import {debounceTime, distinct, filter, flatMap, map, tap} from 'rxjs/operators';
import {WINDOW} from './window.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private connection: ConnectionService,
              private auth: AuthService,
              private notify: NotificationService,
              @Inject(WINDOW) private window: Window) {
    this.init();
  }

  private cache = [];

  questions$: Observable<QuestionModel[]>;

  tags$: Observable<TagModel[]>;

  private selectedCategory = 0;

  currentUser: UserModel;

  isAdmin: boolean;

  page: Pageable;

  private pageByManual$ = new BehaviorSubject(false);

  private loadNextByScroll$ = fromEvent(this.window, 'scroll')
    .pipe(
      map(() => (this.getScrollPercent(this.window.scrollY))),
      filter(percent => percent > 0.8),
      map(value => value > 0.8),
      debounceTime(200),
    );

  private loadDataStream$ =
    merge(this.loadNextByScroll$, this.pageByManual$);

  private getScrollPercent(scroll: number) {
    return ((scroll + this.window.innerHeight) / this.window.document.body.scrollHeight);
  }

  private getNextInputParams() {
    const inputParams = {
      page: 0,
      size: 10
    };
    if (this.page) {
      inputParams.page = this.page.last ? this.page.pageNumber : this.page.pageNumber + 1;
      inputParams.size = this.page.pageSize;
    }
    return inputParams;
  }

  init(): void {
    this.auth.isCurrentUserAdmin$.subscribe(value => this.isAdmin = value);
    this.tags$ = this.connection.getTags();
    this.auth.currentUser$
      .subscribe((user: UserModel) => this.currentUser = user);
    this.questions$ = this.connection.getQuestions();
  }

  reloadTags(): void {
    this.tags$ = this.connection.getTags();
  }

  next(): void {
    if (this.selectedCategory === 0) {
      this.questions$ = this.connection.getQuestions();
    } else {
      this.questions$ = this.connection.getQuestionsByTagId(this.selectedCategory);
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

  loadAll(): void {
    this.cache = [];
    this.questions$ = this.loadDataStream$
      .pipe(
        flatMap(() => {
          return this.connection.getAllQuestions(this.getNextInputParams())
            .pipe(
              map(
                (page: PageableModel ) => {
                  this.page = page.pageable;
                  this.page.last = page.last;
                  this.page.first = page.first;
                  let result = [];
                  this.cache.forEach(value => result = result.concat(value));
                  if (this.cache[page.pageable.pageNumber] === undefined) {
                    result = result.concat(page.content);
                    this.cache[this.page.pageNumber] = page.content;
                  }
                  return result;
                }
              )
            );
        })
      );
  }
}
