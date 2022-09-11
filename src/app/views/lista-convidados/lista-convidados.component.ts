import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListaconvidadoService } from 'src/app/shared/service/listaconvidado.service';
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
  convidadosPresenca = [];
  constructor(
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    private rest: ListaconvidadoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
   
    
    let  cogidoUrl = '';
    this.route.params.subscribe( param => cogidoUrl = param.codigo);
    const conv = this.rest.getListaConvidado(cogidoUrl).subscribe(data => {
      this.lista = data;
      this.statusDis = this.lista[0].status;
      console.log(this.statusDis)
      
    console.log(this.lista)
     });
     
  }
  

  salvarPresenca() {      
    
    this.rest.putConvidados(this.lista).subscribe(result => { console.log(result) });
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

}
