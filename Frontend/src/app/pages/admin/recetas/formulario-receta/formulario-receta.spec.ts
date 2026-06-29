import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReceta } from './formulario-receta';

describe('FormularioReceta', () => {
  let component: FormularioReceta;
  let fixture: ComponentFixture<FormularioReceta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioReceta],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioReceta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
