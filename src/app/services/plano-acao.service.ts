import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { PlanoAcao } from '../models/plano-acao';
import { Status } from '../models/status';
import { HttpClient } from '@angular/common/http';
import { map, of } from 'rxjs';
import { MenuMasterService } from './menu-master.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoAcaoService {
  static readonly NovoPlanoKey: string = "NOVO_PLANO_KEY";
  planos: PlanoAcao[];
  plano: PlanoAcao;

  constructor(
    private localStorageService: LocalStorageService,
    private menuMasterService: MenuMasterService,
    private http: HttpClient
  ) { }

  possuiPlanos() {
    return (!!this.planos && this.planos.length > 0);
  }

  novoPlano(plano?: PlanoAcao) {
    this.plano = new PlanoAcao(plano);
    this.localStorageService.setItem(PlanoAcaoService.NovoPlanoKey, this.plano);
    return this.plano;
  }

  atualizaPlanos() {
    if(!!this.plano.id && this.plano.id != 0) {
      let indexPlano = this.planos.findIndex(p => p.id == this.plano.id);
      if(indexPlano != -1) this.planos[indexPlano] = this.plano;
    } else {
      this.planos.push(this.plano);
    }
  }

  salvarDadosBasicos(dadosBasicos) {
    this.plano.mapeiaDadosBasicos(dadosBasicos);
    this.localStorageService.setItem(PlanoAcaoService.NovoPlanoKey, this.plano);
  }

  salvarMelhorias(melhorias) {
    this.plano.mapeiaMelhorias(melhorias);
    this.localStorageService.setItem(PlanoAcaoService.NovoPlanoKey, this.plano);
  }

  excluirMelhoria(idMelhoria) {
    this.plano.excluirMelhoria(idMelhoria);
    this.localStorageService.setItem(PlanoAcaoService.NovoPlanoKey, this.plano);
  }

  getStatus() {
    return this.http.get<any[]>("https://example.com/plano-acao/status").pipe(
      map(status => 
        status.map(s => 
          new Status(s)
        )
      )
    );
  }

  getPlanos() {
    if(this.possuiPlanos()) {
      return of(this.mapeiaPlanos(null, this.menuMasterService.getFiltro()));
    }

    return this.http.get<any[]>("https://example.com/plano-acao").pipe(
      map(planos => 
        this.mapeiaPlanos(planos, this.menuMasterService.getFiltro())
      )
    );
  }

  mapeiaPlanos(planos?, filtro?) {
    if(planos) {
      this.planos = planos.map(p => 
        new PlanoAcao(p)
      );
    }

    if(filtro) {
      return this.planos.filter(p => p.escola.id == filtro.escola.id);
    }

    return this.planos;
  }

  getPlano(idPlano) {
    return this.http.get<any>(`https://example.com/plano-acao/${idPlano}`).pipe(
      map(plano => 
        this.novoPlano(plano)
      )
    );
  }

  excluirPlano(idPlano) {
    let indexPlano = this.planos.findIndex(p => p.id == idPlano);
    if(indexPlano != -1) this.planos.splice(indexPlano, 1);
    return this.http.delete<any>(`https://example.com/plano-acao/${idPlano}`);
  }

  
  obterTotaisPlanosAcao() {
    return this.http.get('https://example.com/plano-acao/total');
  }
}
