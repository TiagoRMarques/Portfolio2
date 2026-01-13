import { Component, Input } from '@angular/core';
import { Acao } from '../../models/acao.model';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent {
  @Input() acoes: Acao[] = [];

  get totalCompra(): number {
    return this.acoes.reduce((acc, acao) => acc + acao.quantidade * acao.preco_compra, 0);
  }

  get totalAtual(): number {
    return this.acoes.reduce((acc, acao) => acc + acao.quantidade * (acao.cotacao_atual || 0), 0);
  }

  get variacaoTotal(): number {
    if (this.totalCompra === 0) return 0;
    return ((this.totalAtual - this.totalCompra) / this.totalCompra) * 100;
  }

  getColor(valor: number): string {
    if (valor > 0) return 'green';
    if (valor < 0) return 'red';
    return 'black';
  }
}
