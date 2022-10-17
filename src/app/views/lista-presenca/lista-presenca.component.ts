import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ListaconvidadoService } from 'src/app/shared/service/listaconvidado.service';



export interface Convidado {
  nomeConvidado: string;
}

export interface Familia {
  codigo?: string;  
  convidados?: Convidado[];
}


@Component({
  selector: 'app-lista-presenca',
  templateUrl: './lista-presenca.component.html',
  styleUrls: ['./lista-presenca.component.css']
})
export class ListaPresencaComponent implements OnInit {
  lista: Array<any> = [];
  listaCodigo: any = [];
  dataSource!: MatTableDataSource<any>;
  panelOpenState = false;
  cogidoUrl = '';
  convidadosConfirmados!: Convidado;
  familia!: Familia;

  convidadosFamilia =
  [{
  "codigo": "Familia1",
  "condidados" :[{nome:"Jander"},{nome:"Ellen"},{nome:"Maite"}]
},
{
  "codigo": "Familia2",
  "condidados" :[{nome:"Leandro"},{nome:"Thalia"}]
},
{
  "codigo": "Familia3",
  "condidados" :[{nome:"Felipe"},{nome:"Fernanda"}]
}] ;

  constructor(
    private rest: ListaconvidadoService,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.route.params.subscribe(param => this.cogidoUrl = param.codigo);
  this.getConvidadosStatus();
  }

  getConvidadosStatus() {
    this.rest.getListaPresenca(this.cogidoUrl, false, true ).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.lista = this.dataSource.data;
      
      console.log(this.convidadosFamilia);
    });
  }
  getConvidados(status: boolean, presenca: boolean) {    
    this.rest.getListaPresenca(this.cogidoUrl, false, true ).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filteredData.forEach((element, index) => {
        console.log(this.familia);
        if(this.familia == undefined || this.familia.codigo != element.codigo){
         
          ["",["",""]]
          this.familia.codigo = element.codigo;
          this.familia.convidados = element.nomeConvidado
         
        }else if(this.familia.codigo == element.codigo){
          
          this.lista.push(element.nomeConvidado)
          console.log(this.lista)
          
        }        
        console.log(this.familia)

      });
    });
  }
}
