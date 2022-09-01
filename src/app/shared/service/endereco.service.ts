import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from './model/endereco.model';
import { ResponsePageable } from './model/responsePageable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  
  apiUrl= environment.api;;
  httpOptions={    
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })    
  };
  constructor(
    private httpClient: HttpClient
  ) { }

  public postEndereco(endereco: any): Observable<Endereco>{
    return this.httpClient.post<any>(this.apiUrl +"/endereco", endereco);
  }

  public getListEndereco(): Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(this.apiUrl + "/enderecos");
  }

}
