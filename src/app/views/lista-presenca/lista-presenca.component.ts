import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ListaconvidadoService } from 'src/app/shared/service/listaconvidado.service';

@Component({
  selector: 'app-lista-presenca',
  templateUrl: './lista-presenca.component.html',
  styleUrls: ['./lista-presenca.component.css']
})
export class ListaPresencaComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  panelOpenState = false;
  cogidoUrl = '';
  constructor(
    private rest: ListaconvidadoService,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.rest.getListaPresenca(this.cogidoUrl, false, true ).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
