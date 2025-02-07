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

  constructor(
    // private store: Store<PlanosState>,
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) { }

  buscaPlano(idPlano): PlanoAcao {
    if(!idPlano) {
      return new PlanoAcao();
    }

    let indexPlano = this.planos.findIndex(p => p.id == idPlano);
    if(indexPlano == -1) {
      return new PlanoAcao();
    }

    return this.planos[indexPlano];
  }

  cadastraDadosBasicos(dadosBasicos, idPlano?) {
    let plano = this.buscaPlano(idPlano);
    plano.mapeiaDadosBasicos(dadosBasicos);
    this.localStorageService.setItem(plano);
  }

  cadastraMetas(metas, idPlano?) {
    let plano = this.buscaPlano(idPlano);
    plano.mapeiaMetas(metas);
    this.localStorageService.setItem(plano);
  }

  excluirMeta(idPlano, idMeta) {
    let plano = this.buscaPlano(idPlano);
    plano.excluirMeta(idMeta);
    this.localStorageService.setItem(plano);
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
}
