import { Component, OnDestroy } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { IPlanoAcao, PlanoAcao } from '../../models/plano-acao';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PlanoAcaoService } from '../../services/plano-acao.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MenuMasterService } from '../../services/menu-master.service';
import { AutenticacaoService } from 'autenticacao';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-listagem',
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, ToastModule],
  templateUrl: './listagem.component.html',
  providers: [MessageService]
})
export class ListagemComponent implements OnDestroy {
  planosAcao: IPlanoAcao[] = [ ];

  isAuthenticated: boolean;
  usuario: User | null | undefined;

  constructor(
    private planoAcaoService: PlanoAcaoService,
    private messageService: MessageService,
    private autenticacaoService: AutenticacaoService,
    private menuMasterService: MenuMasterService
  ) {
    this.obtemPlanos();
    this.observaLocalStorage();
    this.checkUsuarioLogado();
  }

  ngOnDestroy(): void {
    window.removeEventListener('storageChanged', () => {  });
  }

  async checkUsuarioLogado() {
    await this.autenticacaoService.isAuthenticated.subscribe({ next:(v) => this.isAuthenticated = v, error: (e) => this.isAuthenticated = false});
    await this.autenticacaoService.user.subscribe({ next:(v) => this.usuario = v, error: (e) => console.error(e)});
    console.log("isAuthenticated", this.isAuthenticated);
    console.log("usuario", this.usuario);
  }
  
  getName(): string {
    if(!!this.usuario && !!this.usuario.name) {
      let names = this.usuario?.name.split('@');
      return names[0];
    }
    return "";
  }

  observaLocalStorage() {
    window.addEventListener("storageChanged", () => { this.obtemPlanos() });
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
