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
  irei!: string;
  lista!: any;
  nomeConvidado = new FormControl();
  statusConfirmacao = new FormControl();
  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });
  constructor(
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    private rest: ListaconvidadoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.convidadoListaForm = this.fb.group({
      // dataPedido: [this.datePipe.transform(this.myDate, 'dd-MM-yyyy HH:mm'), [Validators.required]],      
      convidado: ['', [Validators.required]]
    });
    
    let  cogidoUrl = '';
    this.route.params.subscribe( param => cogidoUrl = param.codigo);
    const conv = this.rest.getListaConvidado(cogidoUrl).subscribe(data => {
      this.lista = data;
     });
     
     
  }

  salvarPresenca() {
    const codigo = this.codigoFamilia();
    console.log(codigo)
    this.convidadoListaForm.value.convidado = [{
      nomeConvidado: this.nomeConvidado.value,
      status: false
    }]
    console.log(this.convidadoListaForm.value.convidado);
    const convidados = [
      {
        "codigo": codigo,
        "dataConfirmacao": "2022-08-24",
        "nomeConvidado": "Convidado2",
        "status": true
      },
      {
        "codigo": codigo,
        "dataConfirmacao": "2022-08-24",
        "nomeConvidado": "Convidado1",
        "status": true
      }
    ]

    this.rest.postConvidados(convidados).subscribe(result => { console.log(result) });
  }
  createPedido() {
    console.log(this.convidadoListaForm.value.nomeConvidado)
  }
  onCancelar() {

  }

  updateCheckList(e: any) {
    console.log(e);
    console.log(this.toppings.value)
    this.irei = "vou";
  }
  codigoFamilia() {
    var result = '';
    var characters = 'janderellencasamento24102022987456';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result;
  }

}
