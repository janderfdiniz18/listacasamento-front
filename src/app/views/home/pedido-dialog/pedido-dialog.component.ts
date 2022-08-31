import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { EnderecoService } from 'src/app/shared/service/endereco.service';
import { Produto } from 'src/app/shared/service/model/produto.model';
import { PedidoService } from 'src/app/shared/service/pedido.service';
import { ProdutoService } from 'src/app/shared/service/produto.service';
import { map, startWith } from 'rxjs/operators';
interface Pagamento {
  tipo: string;
  // sound: string;
}

@Component({
  selector: 'app-pedido-dialog',
  templateUrl: './pedido-dialog.component.html',
  styleUrls: ['./pedido-dialog.component.css'],
  providers: [DatePipe]
})
export class PedidoDialogComponent implements OnInit {
  public pedidoForm!: FormGroup;
  public myDate = new Date(Date.now());
  CountProds = 1;
  public enderecosList: any = [];
  public produtosList: any = [];
  public produtosAdd: any = [];

  numeroControl = new FormControl();
  ruaControl = new FormControl();
  telefones: string[] = ['987689', '985487', '983289'];
  ruas: string[] = [];
  filteredOptionsNumero!: Observable<string[]>;
  filteredOptionsRua!: Observable<string[]>;

  tipos: Pagamento[] = [
    { tipo: 'Dinheiro' },
    { tipo: 'Cartão' },
    { tipo: 'Pix' },
    { tipo: 'Fiado' },
    { tipo: 'Recibo' },
  ];

  public valorTotals = 0;
  public valorUnitario = 0;
  public quantidadeProduto = 1;
  constructor(
    private rest: PedidoService,
    private enderecoService: EnderecoService,
    private produtoService: ProdutoService,
    // private clienteService: ClienteService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<PedidoDialogComponent>) {
    this.getListas();

  }

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      // dataPedido: [this.datePipe.transform(this.myDate, 'dd-MM-yyyy HH:mm'), [Validators.required]],
      status: ['', [Validators.required]],
      valorTotal: ['', [Validators.required]],
      // horaPedido: ['12:00'],
      formaPagamento: ['', [Validators.required]],
      clienteDTO: ['', Validators.required],
      telefone: ['', [Validators.required]],
      numeroResidencia: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      nomeCliente: ['', [Validators.required]],
      itensPedidosDTO: this.fb.array([this.fb.group({produto:['']})]),
    })

    this.filteredOptionsNumero = this.numeroControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterNumero(value))
    );

    this.filteredOptionsRua = this.ruaControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterRua(value))
    );
  }
  enderecosControl = new FormControl('', Validators.required);
  pagamentoControl = new FormControl('', Validators.required);
  produtoControl = new FormControl('', Validators.required);

  onCancelar(): void {
    this.dialogRef.close();
    this.pedidoForm.reset();
  }
  private _filterNumero(value: string): string[] {

    const filterValue = value.toLowerCase();

    return this.telefones.filter(telefone => telefone.toLowerCase().includes(filterValue));
  }

  private _filterRua(value: string): string[] {

    const filterValue = value.toLowerCase();

    return this.ruas.filter(rua => rua.toLowerCase().includes(filterValue));
  }

  get getAddInput() {
    return this.pedidoForm.get('itensPedidosDTO') as FormArray;
  }

  addProtudo() {
    console.log(this.produtoControl.value)
    this.produtosAdd.push(this.produtoControl.value)
    const control = <FormArray>this.pedidoForm.controls['itensPedidosDTO'];
    control.push(this.fb.group({ produto: [this.produtoControl.value] }))
  }

  getListas() {
    this.enderecoService.getListEndereco().subscribe(endr => {

      this.enderecosList = endr.content;
      this.enderecosList.forEach((element: any) => {
        this.ruas.push(element.rua)
      });
    })

    this.produtoService.getLisProdutos().subscribe(prd => {

      this.produtosList = prd.content;
    })

  }
  createPedido() {
    console.log(this.produtosAdd)
    this.pedidoForm.value.formaPagamento = this.pagamentoControl.value.tipo
    this.pedidoForm.value.clienteDTO = {
      nome: this.pedidoForm.value.nomeCliente,
      telefone: this.numeroControl.value,
      statusCliente: "Ativo",
      numeroResidencia: this.pedidoForm.value.numeroResidencia,
      enderecoDTO: {
        rua: this.ruaControl.value,
        complemento: 'Casa',
        cidade: 'São José dos Campos',
        bairro: 'Galo Branco'
      }
    }
    this.pedidoForm.value.itensPedidosDTO = [{
      quantidade: this.quantidadeProduto,
      produtosDTO:{
        nome:this.produtoControl.value.nome
      }
    }]

    this.rest.postPedido(this.pedidoForm.value).subscribe(result => { });
    this.dialogRef.close();
    this.pedidoForm.reset();
  }

  someMethod(e: any) {
    if (e.nome == "LiquiGas") {
      this.produtoService.getLisValores(e.id).subscribe(data => {
        this.valorTotals += data.valor;
        this.valorUnitario = data.valor;
      });;
    }
    if (e.nome == "Água") {
      this.valorUnitario = 8;
    }
  }
}
