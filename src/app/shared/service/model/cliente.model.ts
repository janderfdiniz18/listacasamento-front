import { Endereco } from "./endereco.model";

export class Cliente{
    nomeCliente?: string;
    telefone?: number;
    status?: string;
    enderecoDTO?:Endereco;
    numeroResidencia?: number;
}