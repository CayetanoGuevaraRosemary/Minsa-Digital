import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMedicamento } from './formulario-medicamento';

describe('FormularioMedicamento', () => {
  let component: FormularioMedicamento;
  let fixture: ComponentFixture<FormularioMedicamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioMedicamento],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioMedicamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
