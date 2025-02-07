import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PlanoAcaoService } from '../../services/plano-acao.service';
import { Acao } from '../../../models/acao';
import { acoesFormConfig } from './acoes-form-config';
import { Meta } from '../../../models/meta';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-acoes',
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './acoes.component.html',
  styleUrl: './acoes.component.scss'
})
export class AcoesComponent {
  readonly formConfig = acoesFormConfig;
  form: FormGroup;
  metas: Meta[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planoAcaoService: PlanoAcaoService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) { }

  adicionarAcao() {

  }

  editarAcao(idAcao) {

  }

  excluirAcao(idAcao) {
    
  }
}