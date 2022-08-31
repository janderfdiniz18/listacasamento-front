import { Cliente } from "./cliente.model";
import { ItemPedido } from "./intemPedido.model";

export interface Pedido {
    id?: number;
    dataPedido?: string;
    status?: string;
    valorTotal?: number;
    // horaPedido?:number;
    formaPagamento?: string;
    cliente?: Cliente;
    ItensPedidos?:Array<ItemPedido>;



}