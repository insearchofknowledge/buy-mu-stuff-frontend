import { TestBed } from '@angular/core/testing';

import { OrderLineDtoService } from './order-line-dto.service';

describe('OrderLineService', () => {
  let service: OrderLineDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderLineDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
