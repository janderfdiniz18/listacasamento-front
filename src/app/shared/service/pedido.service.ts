import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from './model/pedido.model';
import { ResponsePageable } from './model/responsePageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  apiUrl= environment.api;
  httpOptions={    
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })    
  };
  constructor(
    private httpClient: HttpClient
  ) { }

  public postPedido(pedido: Pedido): Observable<Pedido>{
    console.log(pedido)
    return this.httpClient.post<Pedido>(this.apiUrl+ "/api/books", pedido);
  }

  
  public getListPedido(): Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(this.apiUrl + "/pedidos")
  }
}
