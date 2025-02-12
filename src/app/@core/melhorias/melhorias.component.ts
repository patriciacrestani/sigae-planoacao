import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule, FloatLabel } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { melhoriasFormConfig } from './melhorias-form-config';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanoAcaoService } from '../../services/plano-acao.service';
import { Melhoria } from '../../../models/melhoria';
import { PlanoAcao } from '../../../models/plano-acao';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-melhorias',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FloatLabelModule, InputTextModule, ButtonModule, FloatLabel, FluidModule, ConfirmDialog, ToastModule],
  templateUrl: './melhorias.component.html',
  styleUrl: './melhorias.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class MelhoriasComponent {
  readonly formConfig = melhoriasFormConfig;
  form: FormArray<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private planoAcaoService: PlanoAcaoService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) {
    this.createForm();
    this.obtemPlano();
  }

  createForm() {
    this.form = new FormArray<any>([]);
  }

  obtemPlano() {
    this.atualizaFormulario(this.planoAcaoService.plano);
  }
  
  get formControls(): FormGroup[] {
    return this.form.controls as FormGroup[];
  }

  addMelhoria(melhoria?: Melhoria) {
    this.form.push(this.fb.group({
      id: [melhoria ? melhoria.id : ''],
      titulo: [melhoria ? melhoria.id : ''],
      indPossuiAcoes: [melhoria ? melhoria.indPossuiAcoes : false]
    }));
  }

  excluirMelhoria(melhoriaIndex) {
    if(this.form.at(melhoriaIndex).get("id")!.value) {
      this.planoAcaoService.excluirMelhoria(this.form.at(melhoriaIndex).get("id")!.value);
    }
    this.form.removeAt(melhoriaIndex);
    this.messageService.add({ severity: 'success', detail: 'Melhoria excluída!' });
  }

  confirmarExclusao(event: Event, melhoriaIndex) {
    if(this.form.at(melhoriaIndex).get("indPossuiAcoes")!.value) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Ao excluir esta melhoria, todas as ações atreladas a ela também serão excluída. Deseja continuar?',
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
          this.excluirMelhoria(melhoriaIndex);
        }
      });
    } else {
      this.excluirMelhoria(melhoriaIndex);
    }
  }

  desabilitarExclusao(): boolean {
    return (this.form.length == 1);
  }

  atualizaFormulario(plano: PlanoAcao) {
    if(plano.possuiMelhorias) {
      plano.melhorias?.forEach(melhoria => {
        this.addMelhoria(melhoria);
      });
    }
    this.addMelhoria();
  }

  desabilitaAvancar(): boolean {
    return this.form.invalid;
  }

  avancar() {
    this.planoAcaoService.salvarMelhorias(this.form.getRawValue());
    this.router.navigate(['..', 'acoes'], { relativeTo: this.route });
  }
}