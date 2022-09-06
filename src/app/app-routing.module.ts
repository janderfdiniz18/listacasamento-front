import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaConvidadosComponent } from './views/lista-convidados/lista-convidados.component';
import { NoivosComponent } from './views/noivos/noivos.component';
const routes: Routes = [

  {
     path: 'lista/:codigo',
     component: ListaConvidadosComponent,
  },
  {
    path: 'noivos',
    component: NoivosComponent,
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
