import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import {QuestionModel} from '../models/questionModel';
import {QuestionTag} from '../models/responseInterface';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  form: FormGroup;

  availableTags: QuestionTag[];

  question: QuestionModel = new QuestionModel();

  constructor(private connection: ConnectionService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      orders: new FormArray([])
    });

    this.connection.getTags().subscribe( (value: QuestionTag[]) => {
      this.availableTags = value;
      this.addCheckboxes();
      console.log(value); } );
  }

  private addCheckboxes() {
    this.availableTags.map((o, i) => {
      const control = new FormControl(false);
      (this.form.controls.orders as FormArray).push(control);
    });
  }

  clickFunction() {
    this.question.answers = [];
    this.question.tags = [];
    this.form.value.orders
      .map((v, i) => v ? this.question.tags.push(this.availableTags[i])  : null)
      .filter(v => v !== null);
    console.log(this.question);
    this.connection.sendNewQuestion(this.question).subscribe(value => console.log(value));
  }

  ngOnInit() {

  }
}

