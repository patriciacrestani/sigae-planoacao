import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastrarAcaoComponent } from './modal-cadastrar-acao.component';

describe('ModalCadastrarAcaoComponent', () => {
  let component: ModalCadastrarAcaoComponent;
  let fixture: ComponentFixture<ModalCadastrarAcaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCadastrarAcaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastrarAcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
