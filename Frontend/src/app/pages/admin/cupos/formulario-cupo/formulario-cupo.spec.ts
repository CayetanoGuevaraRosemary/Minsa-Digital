import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCupo } from './formulario-cupo';

describe('FormularioCupo', () => {
  let component: FormularioCupo;
  let fixture: ComponentFixture<FormularioCupo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCupo],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioCupo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
