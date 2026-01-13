import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private API_KEY = 'c5ffaeec268bab18377dd160238c8df0'; // <--- substitui pela tua API Key
  private BASE_URL = 'http://api.marketstack.com/v1/eod';

  constructor(private http: HttpClient) {}

  getStockPrice(symbol: string): Observable<any> {
    const url = `${this.BASE_URL}?access_key=${this.API_KEY}&symbols=${symbol}`;
    return this.http.get<any>(url);
  }
}
