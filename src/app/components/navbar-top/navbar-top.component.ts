import {Component, Input, OnInit, Output} from '@angular/core';
import {ConnectionService} from '../../services/connection.service';
import {TagModel} from '../../models/tagModel';
import {NotificationService} from '../../services/notification.service';
import {RegisterLoginComponent} from '../register-login/register-login.component';
import {NgbDropdownConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  @Input() title: string;

  editNew = false;

  newTag = new TagModel();

  REGISTER = 0;
  LOGIN = 1;

  constructor(private connection: ConnectionService,
              private notify: NotificationService,
              private modalService: NgbModal,
              private authorization: AuthService,
              private dropdownConfig: NgbDropdownConfig,
              public dataService: DataService) {
  }

  openModal(mode: number) {
    const modalRef = this.modalService.open(RegisterLoginComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.mode = mode;
  }

  submitNewTag() {
    this.connection.sendNewTag(this.newTag)
      .subscribe(
        (value: TagModel) => {
          this.editNew = false;
          this.newTag = new TagModel();
          this.notify.showSuccess(value.tagName, 'Saved');
        }, error1 => {
          this.notify.handleError(error1);
        });
  }

  ngOnInit() {
    this.dropdownConfig.autoClose = true;
  }

  logout() {
    this.authorization.logOut();
  }

}
