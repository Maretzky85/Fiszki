import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, tap} from 'rxjs/operators';
import {NotificationService} from './notification.service';
import {LoadingBarService} from '@ngx-loading-bar/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public auth: AuthService,
              private notify: NotificationService,
              private loadingBar: LoadingBarService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingBar.start();
    if (req instanceof HttpRequest) {
      req = this.addAuthorizationToken(req);
    }
    return next.handle(req)
      .pipe(
        tap(evt => {
          if (evt instanceof HttpResponse) {
            this.loadingBar.complete();
          }
        }), catchError((err: any) => {
          this.loadingBar.complete();
          this.handleError(err);
          return of(err);
        }));
  }

  private addAuthorizationToken(req: HttpRequest<any>): HttpRequest<any> {
    if (this.auth.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `${this.auth.token}`
        }
      });
    }
    return req;
  }

  private handleError(err: any) {
    if (err instanceof HttpErrorResponse) {
        this.notify.handleError(err);
      // log error
    }
  }
}
