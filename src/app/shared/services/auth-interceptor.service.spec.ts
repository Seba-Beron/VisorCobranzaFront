import { TestBed } from '@angular/core/testing';

import { AuthInterceptorsService } from './auth-interceptor.service';

describe('AuthInterceptorsService', () => {
  let service: AuthInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
