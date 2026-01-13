import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// <-- Certifica-te que esta linha existe

import { AppComponent } from './app.component';
// import { TabelaComponent } from './components/tabela/tabela.component'; // Se tiveres componentes separados
// import { GraficoComponent } from './components/grafico/grafico.component'; // Se tiveres componentes separados


@NgModule({
  declarations: [
    AppComponent,
    // TabelaComponent, // Se tiveres componentes separados
    // GraficoComponent // Se tiveres componentes separados
  ],
  imports: [
    BrowserModule, // <-- E que está aqui nos imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
