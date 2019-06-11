import {Component, Input, OnInit, Output} from '@angular/core';
import {ConnectionService} from '../services/connection.service';
import {QuestionTag} from '../models/responseInterface';
import {CategoryDataSharingService} from '../services/category-data-sharing.service';
import {TagModel} from '../models/tagModel';
import {NotificationService} from '../services/notification.service';
import {RegisterLoginComponent} from '../register-login/register-login.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../services/auth.service';
import {UserModel} from '../models/UserModel';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

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

  user: UserModel;

  REGISTER = 0;
  LOGIN = 1;

  constructor(private connection: ConnectionService,
              private categorySharingService: CategoryDataSharingService,
              private notify: NotificationService,
              private modalService: NgbModal,
              private spinner: Ng4LoadingSpinnerService,
              public authorization: AuthService) {
  }

  openModal(mode: number) {
    const modalRef = this.modalService.open(RegisterLoginComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.mode = mode;
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
          this.notify.handleError(error1);
        });
  }

  loadTags() {
    this.connection.getTags().subscribe(
      (value: QuestionTag[]) => {
        this.tagList = value;
        this.spinner.hide();
      },
      (error) => this.notify.handleError(error)
    );
  }

  ngOnInit() {
    this.loadTags();
    this.authorization.loggedUser
      .subscribe(
        user => {this.user = user;
        this.spinner.hide(); }
  );
  }

  logout() {
    this.authorization.logOut();
  }
}
