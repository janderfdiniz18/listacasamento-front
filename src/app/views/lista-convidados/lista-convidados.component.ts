import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { ListaconvidadoService } from 'src/app/shared/service/listaconvidado.service';

export interface Task {
  nomeConvidado: string;
  statusConfirmacao: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-lista-convidados',
  templateUrl: './lista-convidados.component.html',
  styleUrls: ['./lista-convidados.component.css']
})


export class ListaConvidadosComponent implements OnInit {
  public convidadoListaForm!: FormGroup;
  lista: any =[];
  statusDis!: boolean;
  nomeConvidado = new FormControl();
  statusConfirmacao = new FormControl();
  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });

  task!: Task;
  
  convidadosPresenca = [];
  constructor(
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    private rest: ListaconvidadoService,
    private route: ActivatedRoute) { 

      let  cogidoUrl = '';
    this.route.params.subscribe( param => cogidoUrl = param.codigo);
    this.rest.getListaConvidado(cogidoUrl).subscribe(data => {
      this.lista = data;
      this.statusDis = this.lista[0].status;
      console.log(this.statusDis)
      this.task = {
        nomeConvidado: 'Todos',
        statusConfirmacao: false,
        color: 'primary',
        subtasks: this.lista,
      };
      
     });
     console.log(this.lista)
    }

  ngOnInit(): void {
     
  }
  
 

  popularCheck(lista: any){
    
  }

  salvarPresenca() {      
    console.log(this.task);
    // this.rest.putConvidados(this.lista).subscribe(result => { console.log(result) });
  }
  createPedido() {
    console.log(this.convidadoListaForm.value.nomeConvidado)
  }
  onCancelar() {

  }

  updateConfirmList(e: any, i:number) {
    this.lista[i].statusConfirmacao = true
  }
  updateCancelList(e: any, i:number) {
    this.lista[i].statusConfirmacao = false
    console.log(this.lista)
  }
  codigoFamilia() {
    var result = '';
    var characters = 'janderellen24102022';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result;
  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.statusConfirmacao);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.statusConfirmacao).length > 0 && !this.allComplete;
  }

  setAll(statusConfirmacao: boolean) {
    this.allComplete = statusConfirmacao;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.statusConfirmacao = statusConfirmacao));
  }

}
