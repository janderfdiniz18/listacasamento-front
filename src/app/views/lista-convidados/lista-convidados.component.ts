import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ListaconvidadoService } from 'src/app/shared/service/listaconvidado.service';
@Component({
  selector: 'app-lista-convidados',
  templateUrl: './lista-convidados.component.html',
  styleUrls: ['./lista-convidados.component.css']
})
export class ListaConvidadosComponent implements OnInit {
  public convidadoListaForm!: FormGroup;
  irei!: string;
  lista = [{
    "nomeConvidado": "Jander",
    "confirmacao": "true"
  },
  {
    "nomeConvidado": "Ellen",
    "confirmacao": "true"
  },];
  nomeConvidado = new FormControl();
  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });
  constructor(private _formBuilder: FormBuilder, private fb: FormBuilder, private rest: ListaconvidadoService) { }

  ngOnInit(): void {
    this.convidadoListaForm = this.fb.group({
      // dataPedido: [this.datePipe.transform(this.myDate, 'dd-MM-yyyy HH:mm'), [Validators.required]],      
      convidado:['', [Validators.required]]
    });
    this.getLista();
    const listaC = this.rest.getListarConvidados().subscribe(data =>{
      console.log(data)  
    });

  }

  getLista(){
    this.lista.forEach(element => {
      this.convidadoListaForm.value.nomeConvidado = element.nomeConvidado
      this.convidadoListaForm.value.statusPresenca = element.confirmacao
    });
   console.log("Passou")
  }

  salvarPresenca(){
    this.convidadoListaForm.value.convidado=[{ 
    nomeConvidado: 'teste',
    status: true
  }]
  const convidados=[
    {
      "codigo": "string",
      "dataConfirmacao": "2022-08-24",
      "nomeConvidado": "string",
      "status": true
    }
  ]

    this.rest.postConvidados(convidados).subscribe(result => { console.log(result)});
  }
  createPedido() {
    console.log(this.convidadoListaForm.value.nomeConvidado)
  }
  onCancelar(){

  }

  updateCheckList(e: any){
    console.log(e);
    console.log(this.toppings.value)
   this.irei = "vou";
  }

}
