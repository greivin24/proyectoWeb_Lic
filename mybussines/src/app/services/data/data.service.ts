import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class DataService {

public list_noticia:any = [{
  "id":0,
 "nombre": "203 Cruceros han llegado al país, esta temporada",
 "imagen": "noticia1.jpg",
 "ruta": "noticia1",
 "sub":"CADA CRUCERISTA GASTA EN PROMEDIO $137 POR DÍA",
 "fecha":"Marzo 23, 2019",
  "descripcion": "Desde el pasado 23 de agosto anterior cuando arrancó la temporada de arribo de cruceros al país las costas costarricenses han recibido a 203 embarcaciones con 354 mil turistas. Según el gobierno estas cifras representan un  9,2% más de cruceros en comparación con la temporada anterior.En los próximos cuatro meses se espera la llegada de otras 46 embarcaciones a los cinco principales puertos del país: Limón, Caldera, Quepos Queen Elizabeth.El primer crucero de esta temporada fue el  Sea Princess que llegó con 1.8"
  
}, {
  "id":1,
  "nombre": "Juan Santamaría moverá 2,5 millones de pasajeros en temporada alta",
  "imagen": "noticia2.jpg",
  "ruta": "noticia2",
  "sub":"DEMANDA EN HORAS PICO ALCANZARÍA MÁS DE 1.300 PASAJEROS SALIENDO Y OTROS 1.400 LLEGANDO",
  "fecha":"Febrero 29, 2019",
   "descripcion": "La temporada de mayor movimiento de pasajeros y turistas en el país ya inició. Por eso, las administración del aeropuerto internacional Juan Santamaría estima que entre diciembre y abril circulen alrededor de 2,5 millones de turistas. Esta es la proyección que realiza la empresa Aeris, encargada de administrar la terminal aérea. La temporada alta se caracteriza por las vacaciones de fin y principio de año en Costa Rica y América Latina, así como la etapa invernal en otros puntos (como EE.UU. o Europa). Por esto último, muchos extranjeros buscan pasar las festividades de la fecha en el país. Según la compañía, esta situación amerita un amplio despliegue operativo en conjunto con 11 instituciones gestoras del Estado. “Parte de las coordinaciones claves en esta temporada se construyen junto a la Dirección General de Migración y Extranjería (DGME), pues la demanda en horas pico puede alcanzar más de 1.300 pasajeros saliendo y otros 1.400 llegando“, recalcó Aeris."
   
 }, {
   "id":2,
  "nombre": "playas de Costa Rica se ubican entre las 50 mejores de la región",
  "imagen": "noticia3.jpg",
  "ruta": "noticia3",
  "sub":"LAS LISTAS MÁS EXTENSAS DE LAS MEJORES PLAYAS DE AMÉRICA CENTRAL Y EL CARIBE",
  "fecha":"Febrero 16, 2019",
   "descripcion": "Las costas de América Central y el Caribe ofrecen amplias razones para empacar sus trajes de baño y reservar un vuelo. Para garantizar que las vacaciones no le decepcionen, FlightNetwork desarrolló una de las listas más extensas de las mejores playas de América Central y el Caribe. La lista la lidera la isla Turks and Caicos ubicada en Bahamas, mientras que Costa Rica posicionó cuatro de sus  espectaculares  paraísos: en el puesto ocho se ubica Manuel Antonio, en el 35 Punta Uva, en el 37 Playa Conchal y finalmente en el puesto 49 Playa Sombrero."
   
 }, {
  "id":3,
 "nombre": "Crean comisión para regular alquileres ilegales en el Caribe Sur",
 "imagen": "noticia4.jpg",
 "ruta": "noticia4",
 "sub":"EMPRESARIOS BUSCAN LA SEGURIDAD DE LOS TURISTAS",
 "fecha":"Enero 27, 2019",
  "descripcion": "Las costas de América Central y el Caribe ofrecen amplias razones para empacar sus trajes de baño y reservar un vuelo. Para garantizar que las vacaciones no le decepcionen, FlightNetwork desarrolló una de las listas más extensas de las mejores playas de América Central y el Caribe. La lista la lidera la isla Turks and Caicos ubicada en Bahamas, mientras que Costa Rica posicionó cuatro de sus  espectaculares  paraísos: en el puesto ocho se ubica Manuel Antonio, en el 35 Punta Uva, en el 37 Playa Conchal y finalmente en el puesto 49 Playa Sombrero."
  
}]



public list_centros:any;


public showedList:any;


constructor() { }


//----------------------------------------------------------- FUNCIONES Noticias
  public getNoticiasList = ()  =>  this.list_noticia;

  public getNoticia = (idx:string) => this.list_noticia[idx];
 

//----------------------------------------------------------- FUNCIONES Centros
  public getCentrosList = () => this.list_centros;

  public searchCentro = (term: string) => {
    if (!term) {
      this.showedList = [];
    } else { 
      term=term.toLowerCase();
      this.showedList = [];
      this.list_centros.forEach(  (item) => { 
        if (item.nombre.toLowerCase().includes(term) || item.id.toLowerCase().includes(term)) {
          this.showedList.push(item);
        }
      });
      return this.showedList;
    }

  }
}

