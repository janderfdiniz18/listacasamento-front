import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Convidado } from './model/convidado.model';
import { ResponsePageable } from './model/responsePageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaconvidadoService {
  apiUrl= environment.api;
  httpOptions={    
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })    
  };
  constructor(private httpClient: HttpClient) { }

  public postConvidados(convidados: any){
    console.log(convidados)
    let completeUrl = this.apiUrl + '/lista-casamento'
    return this.httpClient.post<any>(completeUrl, convidados, this.httpOptions);
  }

  public getListaConvidado(codigo: string): Observable<any>{
    let completeUrl = this.apiUrl + '/lista-casamento'
    return this.httpClient.get<any>(completeUrl + '?codigo=' + codigo);
  }
  public getListarConvidados(): Observable<any>{
    let completeUrl = this.apiUrl + '/lista-casamento'
    return this.httpClient.get<any>(completeUrl);
  }
}
