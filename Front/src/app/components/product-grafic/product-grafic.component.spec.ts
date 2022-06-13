import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGraficComponent } from './product-grafic.component';

describe('ProductGraficComponent', () => {
  let component: ProductGraficComponent;
  let fixture: ComponentFixture<ProductGraficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGraficComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGraficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
