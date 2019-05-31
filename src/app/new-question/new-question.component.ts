import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import {QuestionModel} from '../models/questionModel';
import {Answer, QuestionTag} from '../models/responseInterface';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AnswerModel} from '../models/answerModel';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  form: FormGroup;

  availableTags: QuestionTag[];

  question: QuestionModel;

  answer: AnswerModel;

  constructor(private connection: ConnectionService, private formBuilder: FormBuilder) {
    this.question = new QuestionModel();
    this.answer = new AnswerModel();
    this.form = this.formBuilder.group({
      tags: new FormArray([])
    });

    this.connection.getTags().subscribe( (value: QuestionTag[]) => {
      this.availableTags = value;
      this.addCheckboxes();
      console.log(value); } );
  }

  private addCheckboxes() {
    this.availableTags.map((o, i) => {
      const control = new FormControl(false);
      (this.form.controls.tags as FormArray).push(control);
    });
  }

  clickFunction() {
    this.question.answers = [];
    this.question.tags = [];
    if (this.answer.answer) {
      const answer = new AnswerModel();
      answer.answer = this.answer.answer;
      this.question.answers.push(answer);
    } ;
    this.form.value.tags
      .map((v, i) => v ? this.question.tags.push(this.availableTags[i])  : null)
      .filter(v => v !== null);
    console.log(this.question);
    this.connection.sendNewQuestion(this.question).subscribe(value => console.log(value));
  }

  ngOnInit() {

  }
}

