import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../models/questionModel';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css']
})
export class QuestionItemComponent implements OnInit {

  @Input() question: QuestionModel;

  hidden = true;

  constructor() { }

  showAnswer() {
    this.hidden = false;
  }

  ngOnInit() {}

}
