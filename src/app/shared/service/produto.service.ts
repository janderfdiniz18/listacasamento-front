import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from './model/produto.model';
import { ResponsePageable } from './model/responsePageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiUrl= environment.api;
  httpOptions={
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public postProduto(produto: any): Observable<Produto>{
    return this.httpClient.post<any>(this.apiUrl + "/produto", produto);
  }

  public getLisProdutos(): Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(this.apiUrl + "/produtos");
  }

  public getLisValores(id: number): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl + "/valores");
  }
}
