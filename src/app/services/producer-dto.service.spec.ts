import { TestBed } from '@angular/core/testing';

import { ProducerDtoService } from './producer-dto.service';

describe('ProducerDtoService', () => {
  let service: ProducerDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducerDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
