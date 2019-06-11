import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {catchError, tap} from 'rxjs/operators';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public auth: AuthService,
              private spinnerService: Ng4LoadingSpinnerService,
              private notify: NotificationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    if (req instanceof HttpRequest) {
      req = this.addAuthorizationToken(req);
    }
    return next.handle(req)
      .pipe(
        tap(evt => {
          if (evt instanceof HttpResponse) {
            this.spinnerService.hide();
          }
        }), catchError((err: any) => {
          this.spinnerService.hide();
          this.handleError(err);
          return of(err);
        }));
  }

  private addAuthorizationToken(req: HttpRequest<any>): HttpRequest<any> {
    if (this.auth.hasToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: `${this.auth.getToken()}`
        }
      });
    }
    return req;
  }

  private handleError(err: any) {
    if (err instanceof HttpErrorResponse) {
      try {
        this.notify.handleError(err);
      } catch (e) {
        this.notify.showError('An error occurred', '');
      }
      // log error
    }
  }
}
