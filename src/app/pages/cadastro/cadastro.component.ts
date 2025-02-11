import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { PlanoAcaoService } from '../../services/plano-acao.service';

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

  constructor(
    private route: ActivatedRoute,
    private planoAcaoService: PlanoAcaoService
  ) {
    this.checkRouteId();
  }

  checkRouteId() {
    this.route.paramMap.subscribe(params => {
      this.planoAcaoService.carregaPlano(params.get("id"));
    });
  }
}
