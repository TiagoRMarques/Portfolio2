export interface Acao {
  ticker: string;
  empresa: string;
  data_compra: string;
  quantidade: number;
  preco_compra: number;
  cotacao_atual?: number;
  variacao?: number;
}
