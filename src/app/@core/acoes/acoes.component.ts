import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PlanoAcaoService } from '../../services/plano-acao.service';
import { Acao } from '../../../models/acao';
import { acoesFormConfig } from './acoes-form-config';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Melhoria } from '../../../models/melhoria';
import { ModalCadastrarAcaoComponent } from "../modal-cadastrar-acao/modal-cadastrar-acao.component";

@Component({
  selector: 'app-acoes',
  imports: [CommonModule, TableModule, ButtonModule, ModalCadastrarAcaoComponent],
  templateUrl: './acoes.component.html',
  styleUrl: './acoes.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class AcoesComponent {
  @ViewChild('modalCadastrarAcao') modalCadastrarAcao: ModalCadastrarAcaoComponent;
  readonly formConfig = acoesFormConfig;
  form: FormGroup;
  melhorias: Melhoria[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planoAcaoService: PlanoAcaoService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) { 
    this.obtemPlano();
  }
  
  obtemPlano() {
    this.melhorias = this.planoAcaoService.plano.melhorias ? this.planoAcaoService.plano.melhorias : [];
  }

  adicionarAcao() {
    this.modalCadastrarAcao.exibirModal();
  }

  editarAcao(acao: Acao) {
    this.modalCadastrarAcao.exibirModal(acao);
  }

  excluirAcao(idAcao) {
    
  }
}