import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PlanoAcao } from '../../../models/plano-acao';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-listagem',
  imports: [CommonModule, RouterModule, TableModule, ButtonModule],
  templateUrl: './listagem.component.html'
})
export class ListagemComponent {
  planosAcao: PlanoAcao[] = [
    {
      id: 1,
      titulo: "Teste",
      dataInicio: "05/02/2025",
      dataFim: "05/02/2025",
      status: {
        id: 1,
        descricao: "Teste"
      }
    }
  ];

  excluir(planoId) {

  }

}
