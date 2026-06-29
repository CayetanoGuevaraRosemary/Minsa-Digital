import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisVacunas } from './mis-vacunas';

describe('MisVacunas', () => {
  let component: MisVacunas;
  let fixture: ComponentFixture<MisVacunas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisVacunas],
    }).compileComponents();

    fixture = TestBed.createComponent(MisVacunas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
