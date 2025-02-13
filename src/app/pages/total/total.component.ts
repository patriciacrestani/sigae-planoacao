import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanoAcaoService } from '../../services/plano-acao.service';

@Component({
  selector: 'app-total',
  imports: [CommonModule],
  templateUrl: './total.component.html',
  styleUrl: './total.component.scss'
})
export class TotalComponent {
  qtdPlanosAcao: number = 0;

  constructor(
    private planoAcaoService: PlanoAcaoService
  ) {
    this.obterQtdPlanosAcao();
  }

  obterQtdPlanosAcao(){
    this.planoAcaoService.obterTotaisPlanosAcao().subscribe({
      next:(v) => {
        this.qtdPlanosAcao = Number(v);
      }, 
      error: (e) => console.error(e)
    });
  }

}
