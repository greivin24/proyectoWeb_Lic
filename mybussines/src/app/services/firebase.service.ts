import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserAuth } from '../interfaces/interface';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  nodoName:string = "";
  firebaseURL:string;
 
  constructor(private httpClient:HttpClient, private angularFireDatabase:AngularFireDatabase) { }

  setNodeName(node:string){
   this.firebaseURL ="https://angular-crud-firebase-d60e1.firebaseio.com/"+node;
  }


  postNewUser(user:UserAuth){
     const itemRef = this.angularFireDatabase.object('users/'+user.uid);
     return itemRef.set(user);
  }

  putUser(user:UserAuth, key:string){
    this.setNodeName("users/"+key+".json");
    let body = JSON.stringify( user );
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.httpClient.put( this.firebaseURL, body, {headers});
  }

  getUser(key:string){
    this.setNodeName("users/"+key+".json");
    return this.httpClient.get(this.firebaseURL);
  }

  getUsers(){
    this.setNodeName("users.json");
    return this.httpClient.get(this.firebaseURL);
  }

  deleteUser(key:string){
    this.setNodeName("users/"+key+".json");
    return this.httpClient.delete(this.firebaseURL);
  }




  //---------------------------------NEW FUNCIONS

  get(nodokey:string){
    this.setNodeName(nodokey+".json");
    return this.httpClient.get(this.firebaseURL);
  }

  gets(node:string){
    this.setNodeName(node+".json");
    return this.httpClient.get(this.firebaseURL);
  }

  post(val:any, node:string){
    this.setNodeName(node+".json");
    let body = JSON.stringify( val );
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    
    return this.httpClient.post(this.firebaseURL, body, {headers})
  }

  put(val:any, node:string,  key:string){
    this.setNodeName(node+"/"+key+".json");
    let body = JSON.stringify( val );
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.httpClient.put( this.firebaseURL, body, {headers});
  }

  delete(nodokey:string){
    this.setNodeName(nodokey+".json");
    return this.httpClient.delete(this.firebaseURL);
  }


  fromObjetcToArray(items:any){
    let list:any[]=[];
    for (const key in items) {
      list.push(items[key]);
    }
    return list;
  }

}
