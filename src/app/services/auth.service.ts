import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Observer} from 'rxjs';
import {ConnectionService} from './connection.service';
import {UserModel} from '../models/UserModel';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token;

  user = new BehaviorSubject(undefined);
  loggedUser = this.user.asObservable();

  constructor(private connection: ConnectionService) {
  }

  logOut () {
    this.token = undefined;
    this.user.next(undefined);
  }

  register(user: UserModel) {
    return new Observable(
      (observer) => {
        this.connection.register(user).subscribe(
          value => {
            this.token = value.headers.get('Authorization');
            observer.next(user);
            this.user.next(user);
            observer.complete();
          },
          error1 => {
            observer.error(error1);
            observer.complete();
          }
        );
      }
    );
  }

  login(user: UserModel) {
    return new Observable((observer) => {
      this.connection.login(user).subscribe(value => {
        this.token = value.headers.get('Authorization');
        this.user.next(user);
        observer.next(user);
        observer.complete();
      }, error1 => {
        observer.error(error1);
        observer.complete();
      });
    });
  }

  hasToken (): boolean {
    return !!this.token;
  }

  getToken() {
    return this.token;
  }
}
