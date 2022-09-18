import { TestBed } from '@angular/core/testing';

import { SbilanService } from './sbilan.service';

describe('SbilanService', () => {
  let service: SbilanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbilanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
