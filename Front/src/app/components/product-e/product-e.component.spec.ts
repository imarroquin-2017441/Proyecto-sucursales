import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEComponent } from './product-e.component';

describe('ProductEComponent', () => {
  let component: ProductEComponent;
  let fixture: ComponentFixture<ProductEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
