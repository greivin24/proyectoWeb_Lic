import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserAuth } from '../interfaces/interface';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  nodoName:string = "";
  firebaseURL:string;
 
  constructor(private httpClient:HttpClient) { }

  setNodeName(node:string){
   this.firebaseURL ="https://angular-crud-firebase-d60e1.firebaseio.com/"+node+".json";
  }


  postNewUser(user:UserAuth){
    this.setNodeName("users");
    let body = JSON.stringify( user );
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
     //.ref.childByAutoId().setValue(user.uid)
    return this.httpClient.post( this.firebaseURL, body, {headers});
    }

    

  
}
