import {Component, Input, OnInit, Output} from '@angular/core';
import {ConnectionService} from '../../services/connection.service';
import {QuestionTag} from '../../models/responseInterface';
import {DataSharingService} from '../../services/data-sharing.service';
import {TagModel} from '../../models/tagModel';
import {NotificationService} from '../../services/notification.service';
import {RegisterLoginComponent} from '../register-login/register-login.component';
import {NgbDropdownConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../services/auth.service';
import {UserModel} from '../../models/UserModel';

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
              private dataSharingService: DataSharingService,
              private notify: NotificationService,
              private modalService: NgbModal,
              private dataSharing: DataSharingService,
              private authorization: AuthService,
              private dropdownConfig: NgbDropdownConfig) {
  }

  openModal(mode: number) {
    const modalRef = this.modalService.open(RegisterLoginComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.mode = mode;
  }

  changeCategory(category: number) {
    this.dataSharingService.changeCategory(category);
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
        this.dataSharing.changeTagsAvailable(value);
      },
      (error) => this.notify.handleError(error)
    );
  }

  ngOnInit() {
    this.dropdownConfig.autoClose = true;
    this.loadTags();
    this.dataSharing.currentUser
      .subscribe(
        user => this.user = user
  );
  }

  logout() {
    this.authorization.logOut();
  }
}
