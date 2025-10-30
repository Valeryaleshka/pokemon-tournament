import { TestBed } from '@angular/core/testing';

import { SortingServiceTs } from './sorting.service.ts';

describe('SortingServiceTs', () => {
  let service: SortingServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
