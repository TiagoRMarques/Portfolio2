import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acao } from '../models/acao.model';

@Injectable({ providedIn: 'root' })
export class CarteiraService {
  constructor(private http: HttpClient) {}

  carregarCarteira(): Observable<Acao[]> {
    return this.http.get<Acao[]>('assets/carteira.json');
  }
}
