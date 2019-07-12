import {Injectable} from '@angular/core';
import {UserModel} from '../models/UserModel';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject(undefined);
  currentUser$ = this.user.asObservable();

  isAdmin = false;

  token;

  // address = 'https://fiszkiapi.sikoramarek.com/';
  address = 'http://localhost:8080/';
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(private http: HttpClient) {
  }

  logOut() {
    this.token = undefined;
    this.user.next(undefined);
  }

  register(user: UserModel) {
    return this.http
      .post<UserModel>(this.address + 'users',
        JSON.stringify(user),
        {headers: this.headers, observe: 'response'})
      .pipe(
        tap(
          x => {
            if (x instanceof HttpResponse) {
              this.token = x.headers.get('Authorization');
              user.password = undefined;
              this.user.next(user);
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
              this.user.next(user);
              const roles: string = x.headers.get('roles');
              if (roles.includes('ADMIN')) {
                this.isAdmin = true;
              } else {
                this.isAdmin = false;
              }
            }
          }
        ));
  }


  hasToken(): boolean {
    return !!this.token;
  }

  getToken() {
    return this.token;
  }
}
