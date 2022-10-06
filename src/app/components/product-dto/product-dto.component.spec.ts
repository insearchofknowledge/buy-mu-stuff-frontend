import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDtoComponent } from './product-dto.component';

describe('ProductDtoComponent', () => {
  let component: ProductDtoComponent;
  let fixture: ComponentFixture<ProductDtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDtoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
