import { TestBed } from '@angular/core/testing';

import { Referencia } from './referencia';

describe('Referencia', () => {
  let service: Referencia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Referencia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
