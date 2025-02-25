import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IPlanoAcao, PlanoAcao } from '../../models/plano-acao';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PlanoAcaoService } from '../../services/plano-acao.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MenuMasterService } from '../../services/menu-master.service';


@Component({
  selector: 'app-listagem',
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, ToastModule],
  templateUrl: './listagem.component.html',
  providers: [MessageService]
})
export class ListagemComponent {
  planosAcao: IPlanoAcao[] = [ ];

  constructor(
    private planoAcaoService: PlanoAcaoService,
    private messageService: MessageService,
    private menuMasterService: MenuMasterService
  ) {
    this.obtemPlanos();
    this.observaLocalStorage();
  }

  observaLocalStorage() {
    window.addEventListener("storageChanged", (dataReceived: Event) => {
      this.obtemPlanos()
     });
  }

  obtemPlanos(): void {
    this.planoAcaoService.getPlanos().subscribe({
      next:(v) => {
        this.planosAcao = v;
      }, 
      error: (e) => console.error(e)
    });
  }

  excluir(idPlano) {
    this.planoAcaoService.excluirPlano(idPlano).subscribe({
      next:(v) => {
        this.messageService.add({ severity: 'success', detail: 'Plano excluído!' });
      }, 
      error: (e) => console.error(e)
    });
  }

}
