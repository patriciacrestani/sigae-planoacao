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
    this.obtemPlano();
  }

  createForm() {
    this.form = this.fb.group({
      melhorias: new FormArray<any>([])
    });
  }

  obtemPlano() {
    this.atualizaFormulario(this.planoAcaoService.plano);
  }
  
  get melhorias(): FormArray {
    return this.form.get("melhorias") as FormArray;
  }

  get formControls(): FormGroup[] {
    return this.melhorias.controls as FormGroup[];
  }

  addMelhoria(melhoria?: Melhoria) {
    this.melhorias.push(this.fb.group({
      id: [melhoria ? melhoria.id : ''],
      titulo: [melhoria ? melhoria.titulo : ''],
      indPossuiAcoes: [melhoria ? melhoria.indPossuiAcoes : false]
    }));
  }

  excluirMelhoria(melhoriaIndex) {
    if(this.melhorias.at(melhoriaIndex).get("id")!.value) {
      this.planoAcaoService.excluirMelhoria(this.melhorias.at(melhoriaIndex).get("id")!.value);
    }
    this.melhorias.removeAt(melhoriaIndex);
    this.messageService.add({ severity: 'success', detail: 'Melhoria excluída!' });
  }

  confirmarExclusao(event: Event, melhoriaIndex) {
    if(this.melhorias.at(melhoriaIndex).get("indPossuiAcoes")!.value) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Ao excluir esta melhoria, todas as ações atreladas a ela também serão excluídas. Deseja continuar?',
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
    return (this.melhorias.length == 1);
  }

  atualizaFormulario(plano: PlanoAcao) {
    if(plano.possuiMelhorias) {
      plano.melhorias?.forEach(melhoria => {
        this.addMelhoria(melhoria);
      });
    } else {
      this.addMelhoria();
    }
  }

  desabilitaAvancar(): boolean {
    return this.form.invalid;
  }

  avancar() {
    this.planoAcaoService.salvarMelhorias(this.form.getRawValue().melhorias);
    this.router.navigate(['..', 'acoes'], { relativeTo: this.route });
  }
}