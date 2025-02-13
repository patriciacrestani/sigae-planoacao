import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from "primeng/floatlabel"
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { acoesFormConfig } from '../acoes/acoes-form-config';
import { Select } from 'primeng/select';
import { Acao } from '../../../models/acao';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../../models/pessoa';

@Component({
  selector: 'app-modal-cadastrar-acao',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Dialog, ButtonModule, FloatLabel, FluidModule, InputTextModule, DatePickerModule, Select],
  templateUrl: './modal-cadastrar-acao.component.html',
  styleUrl: './modal-cadastrar-acao.component.scss'
})
export class ModalCadastrarAcaoComponent {
  @Output() atualizaAcao = new EventEmitter();
  visible: boolean = false;
  form: FormGroup;
  formConfig = acoesFormConfig;
  pessoas: Pessoa[] = [];

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService
  ) {
    this.createForm();
    this.obterPessoas();
  }
  
  obterPessoas() {
    this.pessoaService.obterPessoas().subscribe({ 
      next:(v) => {
        this.pessoas = v;
      }, 
      error: (e) => console.error(e)
    });
  }

  exibirModal(acao?: Acao) {
    if(!!acao) this.atualizarFormulario(acao);
    this.visible = true;
  }

  fecharModal() {
    this.form.reset();
    this.visible = false;
  }

  createForm() {
    this.form = this.fb.group({
      id: [''],
      descricao: [''],
      dataInicioPrevisto: [''],
      dataFimPrevisto: [''],
      responsavel: [''],
    });
  }

  atualizarFormulario(acao: Acao) {
    this.form.get("id")?.setValue(acao.id);
    this.form.get("descricao")?.setValue(acao.descricao);
    this.form.get("dataInicioPrevisto")?.setValue(acao.dataInicioPrevisto);
    this.form.get("dataFimPrevisto")?.setValue(acao.dataFimPrevisto);
    this.form.get("responsavel")?.setValue(acao.responsavel);
  }

  salvar() {
    this.atualizaAcao.emit(this.form.getRawValue());
    this.fecharModal();
  }
}
