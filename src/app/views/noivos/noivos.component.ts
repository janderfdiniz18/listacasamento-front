import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ListaconvidadoService } from 'src/app/shared/service/listaconvidado.service';

@Component({
  selector: 'app-noivos',
  templateUrl: './noivos.component.html',
  styleUrls: ['./noivos.component.css']
})


export class NoivosComponent implements OnInit {

  displayedColumns: string[] = ['Nome', 'Status', 'Codigo', 'DataConfirmacao']
  dataSource!: MatTableDataSource<any>;

  table!: MatTable<any>;

  constructor(private rest: ListaconvidadoService) { }

  ngOnInit(): void {
    this.getConvidados();
  }
getConvidados(){
  this.rest.getListarConvidados().subscribe(data =>{
    this.dataSource = new MatTableDataSource(data);      
  });
}
}
