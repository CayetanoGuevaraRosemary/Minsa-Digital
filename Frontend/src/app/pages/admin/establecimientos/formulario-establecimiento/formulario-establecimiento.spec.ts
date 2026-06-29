import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEstablecimiento } from './formulario-establecimiento';

describe('FormularioEstablecimiento', () => {
  let component: FormularioEstablecimiento;
  let fixture: ComponentFixture<FormularioEstablecimiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEstablecimiento],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioEstablecimiento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
