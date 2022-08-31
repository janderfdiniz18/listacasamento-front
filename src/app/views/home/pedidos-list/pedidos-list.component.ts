import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/shared/service/model/pedido.model';
import { PedidoService } from 'src/app/shared/service/pedido.service';
import { PedidoDialogComponent } from '../pedido-dialog/pedido-dialog.component';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit {

  length?= 0;
  pageSize?= 0;
  @ViewChild(MatTable)
  pedidoLista?: Pedido[];

  displayedColumns: string[] = ['id', 'dataPedido', 'status', 'valorTotal', 'action'];
  dataSource!: MatTableDataSource<Pedido>;
  next: boolean = false;
  table!: MatTable<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public pedidoService: PedidoService,
    public dialog: MatDialog
  ) {

    this.next = false;
  }
  ngOnInit() {
    this.getPedidos();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PedidoDialogComponent, {
      width: '700px',
      // data: {name: this.name, animal: this.animal}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  getPedidos() {
    
    this.pedidoService.getListPedido().subscribe(data => {
      let pedArray: any = []
      pedArray = new MatTableDataSource(data.content);
      this.dataSource = pedArray;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
    this.next = true; 
  }
  onkeypress(event: any) {
    if (event.keyCode == 115) {
      this.openDialog()
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

