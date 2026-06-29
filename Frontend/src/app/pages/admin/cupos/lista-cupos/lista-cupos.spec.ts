import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCupos } from './lista-cupos';

describe('ListaCupos', () => {
  let component: ListaCupos;
  let fixture: ComponentFixture<ListaCupos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCupos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCupos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
