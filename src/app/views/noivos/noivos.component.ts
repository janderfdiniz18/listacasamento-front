import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ListaconvidadoService } from 'src/app/shared/service/listaconvidado.service';

@Component({
  selector: 'app-noivos',
  templateUrl: './noivos.component.html',
  styleUrls: ['./noivos.component.css']
})


export class NoivosComponent implements OnInit {

  displayedColumns: string[] = ['Nome', 'Status', 'Codigo', 'Link']
  dataSource!: MatTableDataSource<any>;

  table!: MatTable<any>;

  constructor(
    private rest: ListaconvidadoService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    let  cogidoUrl = '';
    this.route.params.subscribe( param => cogidoUrl = param.codigo);
    this.getConvidados(cogidoUrl);
  }
getConvidados(codigo: string){
  this.rest.getListaConvidadosNoivos(codigo).subscribe(data =>{
    this.dataSource = new MatTableDataSource(data);      
  });
}
}
