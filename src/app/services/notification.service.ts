import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ErrorModel} from '../models/errorModel';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  options = {
    positionClass: 'toast-bottom-center',
    progressBar: true,
    timeOut: 1500};

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

  handleError(error: ErrorModel) {
    if (error.error.status === 403) {
      this.toastr.warning('Must be logged', 'Access Denied', this.options);
    } else {
      this.toastr.error(error.error.message, error.error.error, this.options);
    }
  }
}
