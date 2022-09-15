import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ListaconvidadoService } from 'src/app/shared/service/listaconvidado.service';
import {AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CadastroConvidadosComponent } from './cadastro-convidados/cadastro-convidados.component';

@Component({
  selector: 'app-noivos',
  templateUrl: './noivos.component.html',
  styleUrls: ['./noivos.component.css']
})


export class NoivosComponent implements AfterViewInit  {

  displayedColumns: string[] = ['Nome', 'Status', 'Link', 'index']
  dataSource!: MatTableDataSource<any>;

  table!: MatTable<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 150];
  pageIndex = 0;
  pageEvent!: PageEvent;

  constructor(
    private rest: ListaconvidadoService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let cogidoUrl = '';
    this.route.params.subscribe(param => cogidoUrl = param.codigo);
    this.getConvidados(cogidoUrl);
    this.dataSource.paginator = this.paginator;
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CadastroConvidadosComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getConvidados(codigo: string) {
    this.rest.getListaConvidadosNoivos(codigo).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
