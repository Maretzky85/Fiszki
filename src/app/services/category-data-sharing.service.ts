import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataSharingService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: number) {
    this.messageSource.next(message);
  }

  constructor() { }
}
