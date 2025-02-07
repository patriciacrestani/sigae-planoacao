import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule, FloatLabel } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { metasFormConfig } from './metas-form-config';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanoAcaoService } from '../../services/plano-acao.service';
import { Meta } from '../../../models/meta';
import { PlanoAcao } from '../../../models/plano-acao';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-metas',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FloatLabelModule, InputTextModule, ButtonModule, FloatLabel, FluidModule, ConfirmDialog, ToastModule],
  templateUrl: './metas.component.html',
  styleUrl: './metas.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class MetasComponent {
  readonly formConfig = metasFormConfig;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private planoAcaoService: PlanoAcaoService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      metas: new FormArray([]),
    });

    this.addMeta();
  }
  
  get metas(): FormArray {
    return this.form.get("metas") as FormArray;
  }

  get metasForms(): FormGroup[] {
    return this.metas.controls as FormGroup[];
  }

  addMeta(meta?: Meta) {
    this.metas.push(this.fb.group({
      id: [meta ? meta.id : ''],
      titulo: [meta ? meta.id : ''],
      indPossuiAcoes: [meta ? meta.indPossuiAcoes : false]
    }));
  }

  excluirMeta(metaIndex) {
    this.metas.removeAt(metaIndex);
    this.messageService.add({ severity: 'success', detail: 'Meta excluída!' });
  }

  confirmarExclusao(event: Event, metaIndex) {
    if(this.metas.at(metaIndex).get("indPossuiAcoes")!.value) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Ao excluir esta meta, todas as ações atreladas a ela também serão excluída. Deseja continuar?',
        header: 'Atenção!',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true,
      },
        acceptButtonProps: {
          label: 'Excluir',
        },
        accept: () => {
          this.excluirMeta(metaIndex);
        }
      });
    } else {
      this.excluirMeta(metaIndex);
    }
  }

  desabilitarExclusao(): boolean {
    return (this.metas.length == 1);
  }

  atualizaFormulario(plano: PlanoAcao) {
    if(plano.possuiMetas) {
      plano.metas?.forEach(meta => {
        this.addMeta(meta);
      });
    }
  }

  desabilitaAvancar(): boolean {
    return this.form.invalid;
  }

  avancar() {
    this.planoAcaoService.cadastraMetas(this.form.getRawValue());
    this.router.navigate(['..', 'acoes'], { relativeTo: this.route });
  }
}