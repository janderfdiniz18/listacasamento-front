import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './model/cliente.model';
import { ResponsePageable } from './model/responsePageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiUrl= environment.api;
  httpOptions={
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public postCliente(cliente: Cliente): Observable<Cliente>{
    return this.httpClient.post<Cliente>(this.apiUrl + "/cliente", cliente);
  }

  public getListClientes(): Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(this.apiUrl + "/clientes");
  }
}
