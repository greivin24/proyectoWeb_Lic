import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  setObjectValue= (key:string, objectValue:any)=>{
    if (window.localStorage) {
      localStorage.setItem(key, JSON.stringify(objectValue)); 
    }else{
      throw new Error('No se puede almacenar la información, porque no está habilitado el localStorage');
    }
  }

  getObjectValue= (key:string)=>{
      if (window.localStorage) {
        const DATA= JSON.parse(localStorage.getItem(key));
        if (DATA) {
          return DATA;
        }else{
          //console.log('No se encontró el valor ${key} en el localStorage');
          this.setObjectValue(key, null);
          return null;
        }
      }else{
        console.log('No se puede obtener la información, porque no está habilitado el localStorage');
      }
  }

  
  deleteObjectValue(key:string){
    localStorage.removeItem(key);
  }
  


}
