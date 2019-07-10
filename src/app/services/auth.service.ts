import {Injectable} from '@angular/core';
import {UserModel} from '../models/UserModel';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {DataSharingService} from './data-sharing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token;

  // address = 'https://fiszkiapi.sikoramarek.com/';
  address = 'http://localhost:8080/';
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(private http: HttpClient,
              private dataSharing: DataSharingService) {
  }

  logOut() {
    this.token = undefined;
    this.dataSharing.changeUser(undefined);
  }

  register(user: UserModel) {
    return this.http
      .post(this.address + 'users',
        JSON.stringify(user),
        {headers: this.headers, observe: 'response'})
      .pipe(
        tap(
          x => {
            if (x instanceof HttpResponse) {
              this.token = x.headers.get('Authorization');
              user.password = undefined;
              this.dataSharing.changeUser(user);
            }
          }
        ));
  }

  login(user: UserModel) {
    return this.http
      .post(
        this.address + 'login',
        JSON.stringify(user),
        {headers: this.headers, observe: 'response'}).pipe(
        tap(
          x => {
            if (x instanceof HttpResponse) {
              this.token = x.headers.get('Authorization');
              user.password = undefined;
              this.dataSharing.changeUser(user);
              const roles: String = x.headers.get('roles');
              if (roles.includes('ADMIN')) {
                this.dataSharing.setAdmin(true);
              } else {
                this.dataSharing.setAdmin(false);
              }
            }
          }
        ))
      ;
  }


  hasToken(): boolean {
    return !!this.token;
  }

  getToken() {
    return this.token;
  }
}
