import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioVacuna } from './formulario-vacuna';

describe('FormularioVacuna', () => {
  let component: FormularioVacuna;
  let fixture: ComponentFixture<FormularioVacuna>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioVacuna],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioVacuna);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
