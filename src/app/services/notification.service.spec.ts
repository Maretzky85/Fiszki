import {TestBed} from '@angular/core/testing';

import {NotificationService} from './notification.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('NotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA]
  }));

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});
