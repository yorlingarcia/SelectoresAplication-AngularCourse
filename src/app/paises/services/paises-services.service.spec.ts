import { TestBed } from '@angular/core/testing';

import { PaisesServicesService } from './paises-services.service';

describe('PaisesServicesService', () => {
  let service: PaisesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaisesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
