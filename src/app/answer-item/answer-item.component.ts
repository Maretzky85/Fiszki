import {Component, Input, OnInit} from '@angular/core';
import {AnswerModel} from '../models/answerModel';

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.css']
})
export class AnswerItemComponent implements OnInit {

  @Input() answer: AnswerModel;

  constructor() { }

  ngOnInit() {
  }

}
