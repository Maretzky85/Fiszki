import {Component, Input, OnInit} from '@angular/core';
import {ConnectionService} from '../services/connection.service';
import {QuestionTag} from '../models/responseInterface';
import {CategoryDataSharingService} from '../services/category-data-sharing.service';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  @Input() title: string;

  tagList;

  constructor(private connection: ConnectionService,
              private categorySharingService: CategoryDataSharingService) {
  }

  changeCategory(category: number) {
    this.categorySharingService.changeMessage(category);
  }

  ngOnInit() {
    this.connection.getTags().subscribe(
      (value: QuestionTag[]) => {
        this.tagList = value;
      },
      (error) => console.error(error)
    );
  }
}
