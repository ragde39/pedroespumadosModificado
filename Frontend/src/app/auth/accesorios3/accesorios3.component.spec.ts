import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accesorios3Component } from './accesorios3.component';

describe('Accesorios3Component', () => {
  let component: Accesorios3Component;
  let fixture: ComponentFixture<Accesorios3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accesorios3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accesorios3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
