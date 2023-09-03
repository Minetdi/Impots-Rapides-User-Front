import { TestBed } from '@angular/core/testing';

import { GravityFormsService } from './gravity-forms.service';

describe('GravityFormsService', () => {
  let service: GravityFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GravityFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
