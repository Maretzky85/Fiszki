import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerItemComponent } from './answer-item.component';

describe('AnswerItemComponent', () => {
  let component: AnswerItemComponent;
  let fixture: ComponentFixture<AnswerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
