import {Component, Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  options = {
    positionClass: 'toast-bottom-center',
    progressBar: true,
    timeOut: 2000
  };

  showSuccess(message, title) {
    this.toastr.success(message, title, this.options);
  }

  showError(message, title) {
    this.toastr.error(message, title, this.options);
  }

  showInfo(message, title) {
    this.toastr.info(message, title, this.options);
  }

  showWarning(message, title) {
    this.toastr.warning(message, title, this.options);
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      this.toastr.warning('', 'Access Denied', this.options);
    } else {
      this.toastr.error(error.error.message, error.error.error, this.options);
    }
  }
}
