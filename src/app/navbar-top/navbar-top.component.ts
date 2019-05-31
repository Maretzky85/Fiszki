import {Component, Input, OnInit} from '@angular/core';
import {ConnectionService} from '../services/connection.service';
import {TagModel} from '../models/tagModel';
import {QuestionTag} from '../models/responseInterface';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  @Input() title: string;

  tagList;

  constructor(private connection: ConnectionService) {
  }

  ngOnInit() {
    this.connection.getTags().subscribe(
      (value: QuestionTag[]) => {
        this.tagList = value;
        console.log(value);
      },
      (error) => console.error(error)
    );

  }
}
