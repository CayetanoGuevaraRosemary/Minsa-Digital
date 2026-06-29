import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstablecimientos } from './lista-establecimientos';

describe('ListaEstablecimientos', () => {
  let component: ListaEstablecimientos;
  let fixture: ComponentFixture<ListaEstablecimientos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEstablecimientos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaEstablecimientos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
