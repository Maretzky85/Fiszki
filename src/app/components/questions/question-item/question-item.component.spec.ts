import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionItemComponent } from './question-item.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {QuestionModel} from '../../../models/questionModel';
import {QuestionComponent} from '../question.component';
import {ConnectionService} from '../../../services/connection.service';
import {NotificationService} from '../../../services/notification.service';

describe('QuestionItemComponent', () => {
  let component: QuestionItemComponent;
  let fixture: ComponentFixture<QuestionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionItemComponent,
                      QuestionModel,
                      QuestionComponent,
                      ConnectionService,
                      NotificationService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
