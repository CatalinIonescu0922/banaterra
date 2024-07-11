import { TestBed } from '@angular/core/testing';

import { NascutAziService } from './nascut-azi.service';

describe('NascutAziService', () => {
  let service: NascutAziService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NascutAziService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
