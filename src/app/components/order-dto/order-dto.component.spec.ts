import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDtoComponent } from './order-dto.component';

describe('OrderDtoComponent', () => {
  let component: OrderDtoComponent;
  let fixture: ComponentFixture<OrderDtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDtoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
