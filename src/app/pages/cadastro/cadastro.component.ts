import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { StepsModule } from 'primeng/steps';

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
      label: 'Metas',
      routerLink: 'metas'
    },
    {
      label: 'Ações',
      routerLink: 'acoes'
    }
  ];
}
