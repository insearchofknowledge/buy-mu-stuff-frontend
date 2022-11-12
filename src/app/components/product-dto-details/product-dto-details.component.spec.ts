import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDtoDetailsComponent } from './product-dto-details.component';

describe('ProductDtoDetailsComponent', () => {
  let component: ProductDtoDetailsComponent;
  let fixture: ComponentFixture<ProductDtoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDtoDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDtoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
