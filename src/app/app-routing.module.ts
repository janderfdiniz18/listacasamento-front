import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaConvidadosComponent } from './views/lista-convidados/lista-convidados.component';
const routes: Routes = [

  {
     path: 'Lista',
     component: ListaConvidadosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
