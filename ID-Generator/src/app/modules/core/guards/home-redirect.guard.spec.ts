import { TestBed } from '@angular/core/testing';

import { HomeRedirectGuard } from './home-redirect.guard';

describe('HomeRedirectGuard', () => {
  let guard: HomeRedirectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomeRedirectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
