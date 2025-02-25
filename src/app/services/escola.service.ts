import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Escola } from '../models/escola';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  constructor(private http: HttpClient) { }

  obterEscolas() {
    return this.http.get<any[]>('https://example.com/escolas').pipe(
      map(escolas => 
        escolas.map(e => 
          new Escola(e)
        )
      )
    );
  }
}
