import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioReferencia } from './formulario-referencia';

describe('FormularioReferencia', () => {
  let component: FormularioReferencia;
  let fixture: ComponentFixture<FormularioReferencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioReferencia],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioReferencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
