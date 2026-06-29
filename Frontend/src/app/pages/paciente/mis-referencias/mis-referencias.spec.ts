import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReferencias } from './mis-referencias';

describe('MisReferencias', () => {
  let component: MisReferencias;
  let fixture: ComponentFixture<MisReferencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisReferencias],
    }).compileComponents();

    fixture = TestBed.createComponent(MisReferencias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
