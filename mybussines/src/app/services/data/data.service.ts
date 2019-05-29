import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class DataService {

public showedList:any;

constructor() { }


//----------------------------------------------------------- FUNCIONES Noticias
 
  public searchNoticia = (term: string, plist:any) => {
      term=term.toLowerCase();
      this.showedList = [];
      plist.forEach(  (item) => { 
        if (item.nombre.toLowerCase().includes(term) || item.sub.toLowerCase().includes(term)) {
          this.showedList.push(item);
        }
      });
      return this.showedList;
  }

//----------------------------------------------------------- FUNCIONES Centros

  public searchCentro = (term: string, plist:any) => {
      term=term.toLowerCase();
      this.showedList = [];
      plist.forEach(  (item) => {
        if (item.nombre.toLowerCase().includes(term) || item.dirreccion.toLowerCase().includes(term)) {
          this.showedList.push(item);
        }
      });
      return this.showedList;
  }

}

