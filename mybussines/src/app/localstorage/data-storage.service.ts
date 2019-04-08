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

  getCentrosSuscritos(key:string){
    let list1:any[]=[];let list2:any[]=[];let list3:any[]=[];
    let returnList:any[]=[];

    list1 = this.getObjectValue("Centro Turístico Guachipelín_Subscribers");
    list2 = this.getObjectValue("Centro Turístico La Libia_Subscribers");
    list3 = this.getObjectValue("Complejo Turistico la Laguna_Subscribers");

    if(list1 != null)
    for (const iterator of list1) {
      if(key == iterator.uid)
        returnList.push("Centro Turístico Guachipelín");
    }

    if(list2 != null)
    for (const iterator of list2) {
      if(key == iterator.uid)
        returnList.push("Centro Turístico La Libia");
    }

    if(list3 != null)
    for (const iterator of list3) {
      if(key == iterator.uid)
        returnList.push("Complejo Turistico la Laguna");
    }

    //console.log(returnList);
    return returnList;

  }
  


}
