import { TestBed } from '@angular/core/testing';

import { CategoryDataSharingService } from './category-data-sharing.service';

describe('CategoryDataSharingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryDataSharingService = TestBed.get(CategoryDataSharingService);
    expect(service).toBeTruthy();
  });
});
