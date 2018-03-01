import { TestBed, inject } from '@angular/core/testing';

import { ClientapiService } from './clientapi.service';

describe('ClientapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientapiService]
    });
  });

  it('should be created', inject([ClientapiService], (service: ClientapiService) => {
    expect(service).toBeTruthy();
  }));
});
