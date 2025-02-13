import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Pessoa } from '../../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  obterPessoas() {
    return this.http.get<any[]>('https://example.com/pessoas').pipe(
      map(pessoas => 
        pessoas.map(p => 
          new Pessoa(p)
        )
      )
    );
  }
}
