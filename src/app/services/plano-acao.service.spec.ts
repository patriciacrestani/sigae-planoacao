import { TestBed } from '@angular/core/testing';

import { PlanoAcaoService } from './plano-acao.service';

describe('PlanoAcaoService', () => {
  let service: PlanoAcaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanoAcaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
