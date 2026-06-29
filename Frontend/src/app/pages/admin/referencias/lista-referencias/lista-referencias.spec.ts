import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReferencias } from './lista-referencias';

describe('ListaReferencias', () => {
  let component: ListaReferencias;
  let fixture: ComponentFixture<ListaReferencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaReferencias],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaReferencias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
