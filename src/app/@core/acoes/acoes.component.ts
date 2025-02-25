import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PlanoAcaoService } from '../../services/plano-acao.service';
import { Acao } from '../../models/acao';
import { acoesFormConfig } from './acoes-form-config';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Melhoria } from '../../models/melhoria';
import { ModalCadastrarAcaoComponent } from "../modal-cadastrar-acao/modal-cadastrar-acao.component";
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-acoes',
  imports: [CommonModule, TableModule, ButtonModule, ModalCadastrarAcaoComponent, ToastModule],
  templateUrl: './acoes.component.html',
  styleUrl: './acoes.component.scss',
  providers: [MessageService]
})
export class AcoesComponent {
  @ViewChild('modalCadastrarAcao') modalCadastrarAcao: ModalCadastrarAcaoComponent;
  readonly formConfig = acoesFormConfig;
  form: FormGroup;
  melhorias: Melhoria[];
  melhoriaSelecionada: Melhoria;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planoAcaoService: PlanoAcaoService,
    private messageService: MessageService
  ) { 
    this.obtemPlano();
  }
  
  obtemPlano() {
    this.melhorias = this.planoAcaoService.plano.melhorias ? this.planoAcaoService.plano.melhorias : [];
  }

  adicionarAcao(melhoria: Melhoria) {
    this.melhoriaSelecionada = melhoria;
    this.modalCadastrarAcao.exibirModal();
  }

  atualizaAcao(acao) {
    if(!!acao.id && acao.id != 0) {
      let index = this.melhoriaSelecionada.acoes.findIndex(a => a.id == acao.id);
      if(index != -1) this.melhoriaSelecionada.acoes[index] = new Acao(acao);
      this.messageService.add({ severity: 'success', detail: 'Ação editada!' });
    } else {
      this.melhoriaSelecionada.acoes.push(new Acao(acao));
      this.messageService.add({ severity: 'success', detail: 'Ação cadastrada!' });
    }

    let indexMelhoria = this.melhorias.findIndex(m => m.id == this.melhoriaSelecionada.id);
    if(indexMelhoria != -1) this.melhorias[indexMelhoria] = this.melhoriaSelecionada;
  }

  editarAcao(melhoria: Melhoria, acao: Acao) {
    this.melhoriaSelecionada = melhoria;
    this.modalCadastrarAcao.exibirModal(acao);
  }

  excluirAcao(melhoria: Melhoria, acao: Acao) {
    let indexMelhoria = this.melhorias.findIndex(m => m.id == melhoria.id);
    if(indexMelhoria == -1) return;
    let indexAcao = this.melhorias[indexMelhoria].acoes.findIndex(a => a.id == acao.id);
    if(indexAcao == -1) return;
    this.melhorias[indexMelhoria].acoes.splice(indexAcao, 1);
    this.messageService.add({ severity: 'success', detail: 'Ação excluída!' });
  }

  avancar() {
    this.planoAcaoService.salvarMelhorias(this.melhorias);
    this.planoAcaoService.atualizaPlanos();
    this.router.navigate(['..', '..'], { relativeTo: this.route });
  }
}