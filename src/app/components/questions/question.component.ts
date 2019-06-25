import {Component, OnInit} from '@angular/core';
import {ConnectionService} from '../../services/connection.service';
import {QuestionModel} from '../../models/questionModel';
import {DataSharingService} from '../../services/data-sharing.service';
import {NotificationService} from '../../services/notification.service';
import {ActivatedRoute} from '@angular/router';
import {PageableModel} from '../../models/pageableModel';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionList: QuestionModel[] = [];

  questionId: number;

  notification = 'loading';

  params = {
    'page': 0,
    'size': 10
  };

  logged;

  admin = false;

  maxPage;

  private swipeCoord?: [number, number];
  private swipeTime?: number;

  constructor(private connection: ConnectionService,
              private dataSharing: DataSharingService,
              private notify: NotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dataSharing.currentUser.subscribe(value => this.logged = !!value);
    this.questionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.route.snapshot.routeConfig.path === 'admin') {
      this.admin = true;
      if (!this.logged) {
        this.notification = 'Only for logged Users';
        return;
      }
      this.loadAllQuestions();
    } else {
      this.dataSharing.currentCategory.subscribe((category) => {
        if (this.questionId) {
          this.loadQuestionById(this.questionId);
          delete this.questionId;
        } else {
          this.loadNextQuestion(category);
        }
      }, (error1 => this.notify.handleError(error1)));
    }
  }

  loadAllQuestions() {
    this.connection.getAllQuestions(this.params).subscribe(
      (value: PageableModel) => {
        this.maxPage = value.totalPages;
        this.questionList = value.content;
      }
    );
  }

  loadNext() {
    this.dataSharing.currentCategory.subscribe(category => this.loadNextQuestion(category)).unsubscribe();
  }

  loadQuestionById(questionId: number) {
    this.connection.getQuestions(questionId)
      .subscribe(
        (value: QuestionModel[]) => this.questionList = value
      );
  }

  loadNextQuestion(category?: number) {
    if (category === 0) {
      this.connection.getQuestions()
        .subscribe((value: QuestionModel[]) => {
            this.questionList = value;
            this.notification = 'No questions found';
          },
          (error) => this.notify.handleError(error));
    } else {
      this.connection.getQuestionsByTagId(category).subscribe((value: QuestionModel[]) => {
          this.questionList = value;
          this.notification = 'No questions found';
        },
        (error) => this.notify.handleError(error)
      );
    }
  }

  loadAllNext() {
    if (this.params.page < this.maxPage) {
      this.params.page = this.params.page + 1;
    }
    this.loadAllQuestions();
  }

  loadAllPrev() {
    if (this.params.page > 0) {
      this.params.page = this.params.page - 1;
    }
    this.loadAllQuestions();
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        if (swipe === 'next') {
          if (this.admin) {
            this.loadAllNext();
          } else {
            this.loadNext();
          }
        }
        if (swipe === 'previous') {
          if (this.admin) {
            this.loadAllPrev();
          }
        }
      }
    }
  }
}
