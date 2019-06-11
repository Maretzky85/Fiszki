import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor {

  constructor(public auth: AuthService,
              private spinnerService: Ng4LoadingSpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    if (this.auth.hasToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: `${this.auth.getToken()}`
        }
      });
    }

    return next.handle(req);

  }
}
