import { TestBed } from '@angular/core/testing';

import { CategoryDtoService } from './category-dto.service';

describe('CategoryDtoService', () => {
  let service: CategoryDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
