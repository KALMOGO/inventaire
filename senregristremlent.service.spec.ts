import { TestBed } from '@angular/core/testing';

import { SenregristremlentService } from './senregristremlent.service';

describe('SenregristremlentService', () => {
  let service: SenregristremlentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SenregristremlentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
