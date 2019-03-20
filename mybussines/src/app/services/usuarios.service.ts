import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Usuario } from '../interfaces/interface';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  firebaseURL:string = "https://angular-crud-firebase-d60e1.firebaseio.com/usuarios.json";
  constructor(private httpClient:HttpClient) { }

  setUser(user:Usuario){
  let body = JSON.stringify( user );
  let headers = new HttpHeaders({
    'Content-Type':'application/json'
  });

  return this.httpClient.post( this.firebaseURL, body, {headers});
  }
}
