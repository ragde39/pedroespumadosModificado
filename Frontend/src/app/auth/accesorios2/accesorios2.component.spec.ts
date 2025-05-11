import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accesorios2Component } from './accesorios2.component';

describe('Accesorios2Component', () => {
  let component: Accesorios2Component;
  let fixture: ComponentFixture<Accesorios2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accesorios2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accesorios2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
