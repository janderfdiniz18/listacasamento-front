import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaConvidadosComponent } from './views/lista-convidados/lista-convidados.component';
import { ListaPresencaComponent } from './views/lista-presenca/lista-presenca.component';
import { NoivosComponent } from './views/noivos/noivos.component';
const routes: Routes = [

  {
     path: 'lista/:codigo',
     component: ListaConvidadosComponent,
  },
  {
    path: 'noivos/:codigo',
    component: NoivosComponent,
 },
 {
   path: 'presenca/:codigo',
   component: ListaPresencaComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
