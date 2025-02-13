import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { PlanoAcao } from '../../models/plano-acao';
import { Status } from '../../models/status';
import { HttpClient } from '@angular/common/http';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanoAcaoService {
  static readonly NovoPlanoKey: string = "NOVO_PLANO_KEY";
  planos: PlanoAcao[];
  plano: PlanoAcao;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) { }

  possuiPlanos() {
    return (!!this.planos && this.planos.length > 0);
  }

  novoPlano(plano?: PlanoAcao) {
    this.plano = new PlanoAcao(plano);
    this.localStorageService.setItem(this.plano);
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
    this.localStorageService.setItem(this.plano);
  }

  salvarMelhorias(melhorias) {
    this.plano.mapeiaMelhorias(melhorias);
    this.localStorageService.setItem(this.plano);
  }

  excluirMelhoria(idMelhoria) {
    this.plano.excluirMelhoria(idMelhoria);
    this.localStorageService.setItem(this.plano);
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
      return of(this.planos);
    }
    return this.http.get<any[]>("https://example.com/plano-acao").pipe(
      map(planos => 
        this.planos = planos.map(p => 
          new PlanoAcao(p)
        )
      )
    );
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
