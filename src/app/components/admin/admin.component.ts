import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/UserModel';
import {ConnectionService} from '../../services/connection.service';
import {Observable} from 'rxjs';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users$: Observable<UserModel[]>;

  constructor(private connection: ConnectionService,
              private dataService: DataService) { }

  ngOnInit() {
    if (this.dataService.isAdmin) {
      this.loadUsers();
    }
  }

  loadUsers(): void {
    if (this.dataService.isAdmin) {
      this.users$ = this.connection.getUsers();
    }
  }

}
