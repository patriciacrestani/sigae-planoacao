import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { PlanoAcaoService } from '../../services/plano-acao.service';
import { PlanoAcao } from '../../models/plano-acao';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, RouterModule, ButtonModule, StepsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  etapas: MenuItem[] = [
    {
      label: 'Dados básicos',
      routerLink: 'dados-basicos'
    },
    {
      label: 'Melhorias',
      routerLink: 'melhorias'
    },
    {
      label: 'Ações',
      routerLink: 'acoes'
    }
  ];
  plano: PlanoAcao;
  carregando: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private planoAcaoService: PlanoAcaoService
  ) {
    this.checkRouteId();
  }

  checkRouteId() {
    this.route.paramMap.subscribe(params => {
      if(!!params.get("id")) this.obtemPlano(params.get("id"));
      else {
        this.planoAcaoService.novoPlano();
        this.carregando = false;
      }
    });
  }

  obtemPlano(idPlano) {
    this.planoAcaoService.getPlano(idPlano).subscribe({
      next:(v) => {
        this.carregando = false;
      }, 
      error: (e) => console.error(e)
    });
  }
}
