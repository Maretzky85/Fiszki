import {Component, Input, OnInit, Output} from '@angular/core';
import {ConnectionService} from '../services/connection.service';
import {QuestionTag} from '../models/responseInterface';
import {CategoryDataSharingService} from '../services/category-data-sharing.service';
import {TagModel} from '../models/tagModel';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  @Input() title: string;

  @Output() public tagList;

  editNew = false;

  newTag = new TagModel();

  constructor(private connection: ConnectionService,
              private categorySharingService: CategoryDataSharingService,
              private notify: NotificationService) {
  }

  changeCategory(category: number) {
    this.categorySharingService.changeMessage(category);
  }

  submitNewTag() {
    this.connection.sendNewTag(this.newTag)
      .subscribe(
        (value: TagModel) => {
          this.editNew = false;
          this.newTag = new TagModel();
          this.notify.showSuccess(value.tagName, 'Saved');
          this.loadTags();
        }, error1 => {
          console.log(error1);
          this.notify.showError('', 'Error');
        });
  }

  loadTags() {
    this.connection.getTags().subscribe(
      (value: QuestionTag[]) => {
        this.tagList = value;
      },
      (error) => console.error(error)
    );
  }

  ngOnInit() {
    this.loadTags();
  }
}
