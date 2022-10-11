import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { ListaconvidadoService } from 'src/app/shared/service/listaconvidado.service';

export interface Convidado {
  nomeConvidado: string;
  statusConfirmacao: boolean;
  color: ThemePalette;
  convidados?: Convidado[];
}

@Component({
  selector: 'app-lista-convidados',
  templateUrl: './lista-convidados.component.html',
  styleUrls: ['./lista-convidados.component.css']
})


export class ListaConvidadosComponent implements OnInit {
  public convidadoListaForm!: FormGroup;
  lista: any = [];
  statusDis!: boolean;
  nomeConvidado = new FormControl();
  statusConfirmacao = new FormControl();
  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });
  labelPosition: 'true' | 'false' = 'true';
  guest!: Convidado;

  allComplete: boolean = false;
  convidadosPresenca = [];

  constructor(
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    private rest: ListaconvidadoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let cogidoUrl = '';
    this.route.params.subscribe(param => cogidoUrl = param.codigo);
    this.rest.getListaConvidado(cogidoUrl).subscribe(data => {
      this.lista = data;
      this.statusDis = this.lista[0].status;
      this.guest = {
        nomeConvidado: 'Todos',
        statusConfirmacao: false,
        color: 'primary',
        convidados: this.lista,
      };
    });
  }

  salvarPresenca() {
    this.rest.putConvidados(this.lista).subscribe(result => { console.log(result) });
    window.location.reload();
  }
  cancelar(){
    this.rest.putConvidadoCancel(this.lista).subscribe(result => { console.log(result) });
    window.location.reload();
  }

  updateConfirmList( i: number) {
    this.lista[i].statusConfirmacao = false
  }
  updateCancelList(e: any, i: number) {
    this.lista[i].statusConfirmacao = false.valueOf;
  }
  // codigoFamilia() {
  //   var result = '';
  //   var characters = 'janderellen24102022';
  //   var charactersLength = characters.length;
  //   for (var i = 0; i < 5; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength))
  //   }
  //   return result;
  // }


  updateAllComplete() {
    this.allComplete = this.guest.convidados != null && this.guest.convidados.every(t => t.statusConfirmacao);
  }
  updateNaovou() {
    this.allComplete = this.guest.convidados != null && this.guest.convidados.every(t => t.statusConfirmacao);
  }

  someComplete(): boolean {
    if (this.guest.convidados == null) {
      return false;
    }
    return this.guest.convidados.filter(t => t.statusConfirmacao).length > 0 && !this.allComplete;
  }

  setAll(statusConfirmacao: boolean) {
    this.allComplete = statusConfirmacao;
    if (this.guest.convidados == null) {
      return;
    }
    this.guest.convidados.forEach(t => (t.statusConfirmacao = statusConfirmacao));
  }

}
