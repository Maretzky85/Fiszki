import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserModel} from '../models/UserModel';
import {TagModel} from '../models/tagModel';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private category = new BehaviorSubject(0);
  currentCategory = this.category.asObservable();

  private user = new BehaviorSubject(undefined);
  currentUser = this.user.asObservable();

  private tags = new BehaviorSubject(undefined);
  availableTags = this.tags.asObservable();

  public tagsList;

  private adminLogged = new BehaviorSubject(false);
  admin = this.adminLogged.asObservable();

  setAdmin(adminLogged: boolean) {
    this.adminLogged.next(adminLogged);
  }

  changeCategory(category: number) {
    this.category.next(category);
  }

  changeUser(user: UserModel) {
    this.user.next(user);
  }

  changeTagsAvailable(tags: TagModel[]) {
    this.tagsList = tags;
    this.tags.next(tags.length);
  }

  constructor() {
  }
}
