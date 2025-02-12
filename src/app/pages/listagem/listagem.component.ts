import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IPlanoAcao, PlanoAcao } from '../../../models/plano-acao';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PlanoAcaoService } from '../../services/plano-acao.service';


@Component({
  selector: 'app-listagem',
  imports: [CommonModule, RouterModule, TableModule, ButtonModule],
  templateUrl: './listagem.component.html'
})
export class ListagemComponent {
  planosAcao: IPlanoAcao[] = [
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

  constructor(private planoAcaoService: PlanoAcaoService) {
    this.obtemPlanos();
  }

  obtemPlanos() {
    this.planoAcaoService.getPlanos().subscribe({
      next:(v) => {
        this.planosAcao = v;
      }, 
      error: (e) => console.error(e)
    });
  }

  excluir(planoId) {

  }

}
