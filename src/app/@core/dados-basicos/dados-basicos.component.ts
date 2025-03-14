import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { dadosBasicosFormConfig } from './dados-basicos-form-config';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { Status } from '../../models/status';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanoAcao } from '../../models/plano-acao';
import { PlanoAcaoService } from '../../services/plano-acao.service';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { FloatLabel } from "primeng/floatlabel"
import { FluidModule } from 'primeng/fluid';
import { Escola } from '../../models/escola';
import { EscolaService } from '../../services/escola.service';

@Component({
  selector: 'app-dados-basicos',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FloatLabelModule, TextareaModule, SelectModule, DatePickerModule, InputTextModule, ButtonModule, Select, FloatLabel, FluidModule],
  templateUrl: './dados-basicos.component.html',
  styleUrl: './dados-basicos.component.scss'
})
export class DadosBasicosComponent {
  readonly formConfig = dadosBasicosFormConfig;
  form: FormGroup;
  status: Status[];
  escolas: Escola[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private planoAcaoService: PlanoAcaoService,
    private escolaService: EscolaService,
  ) {
    this.createForm();
    this.obtemStatus();
    this.obtemEscolas();
  }

  createForm() {
    this.form = this.fb.group({
      id: [''],
      titulo: ['', Validators.compose([Validators.required, Validators.maxLength(this.formConfig.maxLengths.titulo), Validators.minLength(this.formConfig.minLengths.titulo)])],
      descricao: ['', Validators.compose([Validators.required, Validators.maxLength(this.formConfig.maxLengths.descricao), Validators.minLength(this.formConfig.minLengths.descricao)])],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      status: [null, Validators.required],
      escola: [null, Validators.required],
    });
    this.obtemPlano();
  }

  obtemPlano() {
    this.atualizaFormulario(this.planoAcaoService.plano);
  }

  atualizaFormulario(plano: PlanoAcao) {
    if(!plano) return;
    Object.keys(this.form.controls).forEach(campo => {
      if(!!plano[campo]) {
        switch(campo) {
          case 'dataInicio':
            this.form.controls[campo].setValue(new Date(plano.dataInicio));
            break;
          case 'dataFim':
            this.form.controls[campo].setValue(new Date(plano.dataFim));
            break;
          default:
            this.form.controls[campo].setValue(plano[campo]);
            break;
        }
      }
    })
  }

  obtemStatus() {
    this.planoAcaoService.getStatus().subscribe({
      next:(v) => {
        this.status = v;
      }, 
      error: (e) => console.error(e)
    });
  }

  obtemEscolas() {
    this.escolaService.obterEscolas().subscribe({
      next:(v) => {
        this.escolas = v;
      }, 
      error: (e) => console.error(e)
    });
  }

  desabilitaAvancar(): boolean {
    return this.form.invalid;
  }

  avancar() {
    this.planoAcaoService.salvarDadosBasicos(this.form.getRawValue());
    this.router.navigate(['..', 'melhorias'], { relativeTo: this.route });
  }
}
