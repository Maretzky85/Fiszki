import {Component, OnInit} from '@angular/core';
import {ConnectionService} from '../../services/connection.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';
import {SwipeService} from '../../services/swipe.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {



  constructor(private connection: ConnectionService,
              public dataService: DataService,
              public swipe: SwipeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.dataService.loadSingleQuestion(Number(this.route.snapshot.paramMap.get('id')));
    }
  }

  loadNext() {
    this.dataService.next();
  }
}
