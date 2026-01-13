import { Component, AfterViewInit } from '@angular/core';
import {Chart, registerables } from 'chart.js'; // Importa o Chart.js
import { CommonModule } from '@angular/common';

Chart.register(...registerables); // Regista os módulos necessários do Chart.js

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  title = 'Carteira de Ações';

  acoes = [
  { ticker: 'MSFT', empresa: 'Microsoft', dataCompra: '01-05-2023', precoCompra: 10, quantidade: 50, cotacaoAtual: 12, variacaoPercentagem: 3.1 },
  { ticker: 'TSLA', empresa: 'Tesla', dataCompra: '20-05-2023', precoCompra: 20, quantidade: 20, cotacaoAtual: 18, variacaoPercentagem: 1.81 },
  { ticker: 'AAPL', empresa: 'Apple', dataCompra: '15-06-2023', precoCompra: 30, quantidade: 10, cotacaoAtual: 20, variacaoPercentagem: 1.99 },
  { ticker: 'NVDA', empresa: 'NVIDIA', dataCompra: '10-04-2023', precoCompra: 18, quantidade: 30, cotacaoAtual: 22, variacaoPercentagem: 2.5 },
  { ticker: 'AMZN', empresa: 'Amazon', dataCompra: '05-07-2023', precoCompra: 25, quantidade: 15, cotacaoAtual: 27, variacaoPercentagem: 1.5 },
  { ticker: 'META', empresa: 'Meta', dataCompra: '18-02-2023', precoCompra: 22, quantidade: 18, cotacaoAtual: 24, variacaoPercentagem: 2.8 },
  { ticker: 'NFLX', empresa: 'Netflix', dataCompra: '22-04-2023', precoCompra: 16, quantidade: 25, cotacaoAtual: 15, variacaoPercentagem: -0.8 },
  { ticker: 'NKE', empresa: 'Nike', dataCompra: '30-05-2023', precoCompra: 14, quantidade: 40, cotacaoAtual: 16, variacaoPercentagem: 2.4 },
  { ticker: 'SPOT', empresa: 'Spotify', dataCompra: '10-06-2023', precoCompra: 20, quantidade: 22, cotacaoAtual: 21, variacaoPercentagem: 1.7 },
  { ticker: 'MCD', empresa: 'McDonald\'s', dataCompra: '25-06-2023', precoCompra: 35, quantidade: 12, cotacaoAtual: 37, variacaoPercentagem: 1.3 },
  { ticker: 'F', empresa: 'Ford', dataCompra: '05-08-2023', precoCompra: 11, quantidade: 35, cotacaoAtual: 10, variacaoPercentagem: -0.9 }
];

totalCompra = 0;
valorAtual = 0;
variacaoTotal = 0;

ngOnInit() {
  this.acoes = this.acoes.map(acao => {
    const totalCompra = acao.precoCompra * acao.quantidade;
    const valorAtual = acao.cotacaoAtual * acao.quantidade;
    const variacao = ((acao.cotacaoAtual - acao.precoCompra) / acao.precoCompra);

    // Acumular totais
    this.totalCompra += totalCompra;
    this.valorAtual += valorAtual;

    return {
      ...acao,
      variacaoPercentagem: variacao,
    };
  });

  // Calcular variação total (%)
  this.variacaoTotal = ((this.valorAtual - this.totalCompra) / this.totalCompra) * 100;
}

  ngAfterViewInit(): void {
    this.criarGrafico();
  }

  criarGrafico() {
    const labels = this.acoes.map(acao => acao.empresa);
    const totalCompras = this.acoes.map(acao => acao.precoCompra * acao.quantidade);
    const valoresAtuais = this.acoes.map(acao => acao.cotacaoAtual * acao.quantidade);

    new Chart('carteiraChart', {
  type: 'line',
  data: {
    labels, // ex: ['MSFT', 'AAPL', 'GOOGL', ...]
    datasets: [
      {
        label: 'Total de Compra (€)',
        data: totalCompras,
        backgroundColor: 'rgba(6, 66, 106, 0.6)',
        borderColor: 'rgba(6, 66, 106, 1)',
        tension: 0.3,
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Valor Atual (€)',
        data: valoresAtuais,
        backgroundColor: 'rgba(47, 216, 0, 0.6)',
        borderColor: 'rgba(47, 216, 0, 1)',
        tension: 0.3,
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Comparação: Total de Compra vs. Valor Atual',
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `€ ${context.parsed.y.toFixed(2)}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '€ (euros)',
          font: {
            size: 14
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Ações',
          font: {
            size: 14
          }
        }
      }
    }
  }
});

  }
}
