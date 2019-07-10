import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserModel} from '../../models/UserModel';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {

  @Input() name;
  @Input() mode;

  REGISTER = 0;
  LOGIN = 1;

  user: UserModel;

  constructor(public activeModal: NgbActiveModal,
              private notify: NotificationService,
              public auth: AuthService) {
  }

  ngOnInit() {
    this.user = new UserModel();
  }

  register() {
    this.auth.register(this.user)
      .subscribe(
        resp => {
          this.notify.showSuccess('Welcome ' + this.user.username, 'Logged in');
          this.activeModal.close();
        },
        error1 => {
          console.log(error1);
          this.notify.showWarning('Error', '');
        }
      );
  }

  login() {
    this.auth.login(this.user)
      .subscribe(
        resp => {
          this.notify.showSuccess('Welcome ' + this.user.username, 'Logged in');
          this.activeModal.close();
        },
        () => {
          this.notify.showWarning('Cannot log in', '');
        }
      );
  }

}
