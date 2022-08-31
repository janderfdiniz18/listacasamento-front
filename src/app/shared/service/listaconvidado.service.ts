import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Convidado } from './model/convidado.model';
import { ResponsePageable } from './model/responsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class ListaconvidadoService {
  apiUrl= 'https://localhost:8080/api';
  httpOptions={    
      headers: new HttpHeaders({
        'Content-Type': 'application-json'
      })    
  };
  constructor(private httpClient: HttpClient) { }

  public postConvidados(convidados: any){
    console.log(convidados)
    return this.httpClient.post<any>(this.apiUrl + "/lista-casamento", convidados, this.httpOptions);
  }

  public getListaConvidado(): Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(this.apiUrl + "/convidados");
  }
}
