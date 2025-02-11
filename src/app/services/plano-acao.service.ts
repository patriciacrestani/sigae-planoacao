import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { PlanoAcao } from '../../models/plano-acao';
import { Status } from '../../models/status';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

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

  carregaPlano(idPlano) {
    this.plano = new PlanoAcao(this.possuiPlanos() ? this.planos.find(idPlano) : null);
  }

  novoPlano(plano?: PlanoAcao) {
    this.plano = new PlanoAcao(plano);
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
    return this.http.get<any[]>("https://example.com/plano-acao").pipe(
      map(planos => 
        this.planos = planos.map(p => 
          new PlanoAcao(p)
        )
      )
    );
  }

  getPlano() {
    return this.http.get<any[]>("https://example.com/plano-acao/1").pipe(
      map(plano => 
        this.plano = new PlanoAcao(plano)
      )
    );
  }
}
