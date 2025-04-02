import { TestBed } from '@angular/core/testing';

import { LogoutClientService } from './logout-client.service';

describe('LogoutClientService', () => {
  let service: LogoutClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoutClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
