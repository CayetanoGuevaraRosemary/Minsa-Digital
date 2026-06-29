import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMedicamentos } from './lista-medicamentos';

describe('ListaMedicamentos', () => {
  let component: ListaMedicamentos;
  let fixture: ComponentFixture<ListaMedicamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMedicamentos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaMedicamentos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
