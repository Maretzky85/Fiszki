import {Component, OnInit} from '@angular/core';
import {ConnectionService} from '../../services/connection.service';
import {QuestionModel} from '../../models/questionModel';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AnswerModel} from '../../models/answerModel';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {DataService} from '../../services/data.service';
import {TagModel} from '../../models/tagModel';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  form: FormGroup;

  availableTags: TagModel[];

  question: QuestionModel;

  answer: AnswerModel;

  hasAnswer = false;

  constructor(private connection: ConnectionService,
              private formBuilder: FormBuilder,
              private router: Router,
              private notify: NotificationService,
              private dataService: DataService) {
    this.question = new QuestionModel();
    this.answer = new AnswerModel();
    this.form = this.formBuilder.group({
      tags: new FormArray([])
    });
    this.loadTags().then((value: TagModel[] ) => {this.availableTags = value; this.addCheckboxes(); });
  }

  loadTags() {
    return new Promise(((resolve, reject) => {
      this.dataService.tags$.subscribe(value => resolve(value), error1 => reject(error1));
    }));
  }

  submit() {
    this.question.answers = [];
    this.question.tags = [];

    this.addAnswer();

    this.addTags();

    this.connection.sendNewQuestion(this.question)
      .subscribe(
        (value: QuestionModel) => {
          this.notify.showSuccess(value.title, 'saved');
          this.router.navigate(['/questions/' + value.id]);
        }, error1 => this.notify.handleError(error1)
      );
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  ngOnInit() {
  }

  private addCheckboxes() {
    this.availableTags.map((o, i) => {
      const control = new FormControl(false);
      (this.form.controls.tags as FormArray).push(control);
    });
  }

  private addTags() {
    this.form.value.tags
      .map((v, i) => v ? this.question.tags.push(this.availableTags[i]) : null)
      .filter(v => v !== null);
  }

  private addAnswer() {
    if (this.hasAnswer) {
      const answer = new AnswerModel();
      answer.answer = this.answer.answer;
      this.question.answers.push(answer);
    }
  }
}

