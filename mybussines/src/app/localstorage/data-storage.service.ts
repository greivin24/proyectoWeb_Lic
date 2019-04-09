import { Injectable } from '@angular/core';
import { DataService } from '../services/data/data.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor( private dataService:DataService ) { }

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
    let list:any[]=[];
    let listCentros:any={};
    let returnList:any[]=[];

    listCentros = this.dataService.list_centros;
    for (const i of listCentros) {
      list = this.getObjectValue(i.nombre+"_Subscribers");
      if(list != null)
      for (const iterator of list) {
        if(key == iterator.uid)
          returnList.push(i.nombre);
      }
    }
    //console.log(returnList);
    return returnList;

  }
  


}
