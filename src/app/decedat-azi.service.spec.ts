import { TestBed } from '@angular/core/testing';

import { DecedatAziService } from './decedat-azi.service';

describe('DecedatAziService', () => {
  let service: DecedatAziService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecedatAziService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
