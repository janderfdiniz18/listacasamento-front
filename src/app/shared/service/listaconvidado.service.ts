import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Convidado } from './model/convidado.model';
import { ResponsePageable } from './model/responsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class ListaconvidadoService {
  apiUrl= 'http://localhost:8080/api/lista-casamento';
  httpOptions={    
      headers: new HttpHeaders({
        'Content-Type': 'application-json'
      })    
  };
  constructor(private httpClient: HttpClient) { }

  public postConvidados(convidados: any){
    console.log(convidados)
    return this.httpClient.post<any>(this.apiUrl, convidados, this.httpOptions);
  }

  public getListaConvidado(codigo: string): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl + '?codigo=' + codigo);
  }
  public getListarConvidados(): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl);
  }
}
