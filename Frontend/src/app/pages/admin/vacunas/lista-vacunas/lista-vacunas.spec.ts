import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVacunas } from './lista-vacunas';

describe('ListaVacunas', () => {
  let component: ListaVacunas;
  let fixture: ComponentFixture<ListaVacunas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaVacunas],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaVacunas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
