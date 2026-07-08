import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEspecialidad } from './formulario-especialidad';

describe('FormularioEspecialidad', () => {
  let component: FormularioEspecialidad;
  let fixture: ComponentFixture<FormularioEspecialidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEspecialidad],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioEspecialidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
