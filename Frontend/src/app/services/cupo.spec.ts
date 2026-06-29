import { TestBed } from '@angular/core/testing';

import { Cupo } from './cupo';

describe('Cupo', () => {
  let service: Cupo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cupo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
