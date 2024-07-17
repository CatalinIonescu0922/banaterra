import { TestBed } from '@angular/core/testing';

import { CompaniiService } from './companii.service';

describe('CompaniiService', () => {
  let service: CompaniiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
