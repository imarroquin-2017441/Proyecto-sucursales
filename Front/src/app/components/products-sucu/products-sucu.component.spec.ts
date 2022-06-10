import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSucuComponent } from './products-sucu.component';

describe('ProductsSucuComponent', () => {
  let component: ProductsSucuComponent;
  let fixture: ComponentFixture<ProductsSucuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsSucuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSucuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
