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
  "nombre": "Playas de Costa Rica se ubican entre las 50 mejores de la región",
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



public list_centros:any = [{
  "id":0,
 "nombre": "Centro Turístico Guachipelín",
 "imagen": "1.jpg",
 "direccion":"Heredia, San José",
 "ruta": "c1",
 "telefono":"2269 9975",
 "horarios":"Lunes a Domingo de	8:00–16:00",
 "valoraciones":"4",
 "seguidores":"335",
 "historia":"Se ubica en el primer puesto del ranking. Tiene el mayor número de establecimientos de bajo presupuesto (146) y el precio promedio por noche de alojamiento es de 26 dólares ($ 468). Este destino presenta una infinidad de opciones, tanto de día como de noche. Actualmente, el Gobierno ofrece distintos tours para recorrer la ciudad y sus barrios más representativos: Palermo, Puerto Madero, La Boca, San Telmo y Recoleta. La mayoría de estas excursiones son gratuitas y se pueden realizar en los puntos turísticos. Un dato a tener en cuenta: hace unos meses, Buenos Aires fue elegida como “Ciudad del Año” por la Pacific Area Travel Writers Association (Patwa).",
 "video":"https://www.youtube.com/watch?v=CY_lqgVh_68",
  "descripcion": "El acceso es público, por lo que se sugiere principalmente para días entre semana y algunos sábados. Se cuenta con un rancho para grupos pequeños y un salón de eventos para grupos de 40 participantes en adelante. Entrada general ¢1500 y parqueo ¢1000. La soda abre fines de semana, feriados y vacaciones. El bar abre de jueves a lunes con horario ampliado (ingreso de menores solo con acompañante)"
  
},{
  "id":1,
 "nombre": "Complejo Turistico la Laguna",
 "imagen": "1.jpg",
 "direccion":"San José, Chirraca de Acosta",
 "ruta": "c2",
 "telefono":"2410 0056",
 "horarios":"Lunes a Domingo de	9:00–21:00",
 "valoraciones":"3",
 "seguidores":"520",
 "historia":"Cuenta con 43 hospedajes a bajo costo y el presupuesto promedio por noche es de 38 dólares ($ 774). La ciudad se caracteriza por sus vinos y su gastronomía, por lo que los tours a bodegas son uno de los paseos más aclamados por turistas nacionales e internacionales. Además, se puede disfrutar de diversos espacios verdes para respirar el aire puro de la Cordillera. Independencia, San Martín, Chile y España son algunas de sus plazas más representativas, mientras que entre los parques se destacan O'Higgings y Central.",
 "video":"https://www.youtube.com/watch?v=yvdl_aSa5Yo",
  "descripcion": "El complejo Turistico la Laguna es un balneario de vertientes naturales de agua, con hermosas cascadas y paisajes, donde grupos familiares y amigos pueden disfrutar de un ambiente natural que ofrece los servicios de bar, restaurante, canchas deportivas de futbol, boly, juegos de obstaculos, musica y mas. Asi como tambien pueden nadar junto a los peces y hermosas cascadas que cuenta la laguna.Las instalaciones de la LAGUNA ofrece varios paquetes todo incluido para grupos de integracion familiar, agasajos para empresas, instituciones educativa para escuelas, colegios, universidades entre otros… En el area de restaurante ofrecemos variedad de platos tipicos de la zona a base de asados a leña asi como tambien una esquisita tilapia frita, maito y variedad de picaditas a precios comodos."
  
  
},{
  "id":2,
 "nombre": "Centro Turístico La Libia",
 "imagen": "1.jpg",
 "direccion":"San José, San Lorenzo",
 "ruta": "c3",
 "telefono":"2410 0056",
 "horarios":"Lunes a Viernes de	10:00–22:00",
 "valoraciones":"5",
 "seguidores":"767",
 "historia":"Es uno de los destinos más visitados de Argentina. Cuenta con diversos circuitos para realizar y es ideal para quienes aman los deportes. Se encuentra en el segundo lugar del ranking,con un precio promedio por noche de 49 dólares ($ 882) y 47 alojamientos a bajo costo. Algunos imperdibles de este lugar son: el Parque Nacional Nahuel Huapi, la visita a la Isla Victoria y el Bosque de Arrayanes, el recorrido Circuito Chico, el Centro Cívico, el Camino de los 7 lagos y el cerro Catedral. Un evento importante en la ciudad es Bariloche a la Carta, que ofrecerá en octubre un circuito gastronómico por más de 80 restaurantes. Chocolates y cervezas son productos obligados para degustar.",
 "video":"https://www.youtube.com/watch?v=u5SLOus_u98",
  "descripcion": "Este lugar se caracteriza por sus zonas verdes  distribuidas en 11 hectáreas que se recorren en 2 km de senderos,. Tiene además un jardín japonés que ha sido el preferido de muchos. Las orquídeas son una de las principales atracciones de las cuales tiene más de 1200 especies, así  como colecciones de palmas, helechos, bromelias y heliconias y otras variedades.  Es una de las instituciones botánicas más activas e importantes del Neotrópico."
  
  
} ];


public showedList:any;


constructor() { }


//----------------------------------------------------------- FUNCIONES Noticias
  public getNoticiasList = ()  =>  this.list_noticia;

  public getNoticia = (idx:string) => this.list_noticia[idx];

  public getNoticiaID(key:number){
    let returList= {};
    this.list_noticia.forEach(  (item) => { 
      if (item.id == key) {
        returList = item;
      }
    });
    return returList;
  }
 
  public searchNoticia = (term: string) => {
    if (!term) {
      this.showedList = [];
    } else { 
      term=term.toLowerCase();
      this.showedList = [];
      this.list_noticia.forEach(  (item) => { 
        if (item.nombre.toLowerCase().includes(term) || item.sub.toLowerCase().includes(term)) {
          this.showedList.push(item);
        }
      });
      return this.showedList;
    }

  }

//----------------------------------------------------------- FUNCIONES Centros
  public getCentrosList = () => this.list_centros;

  public getCentro = (idx:string) => this.list_centros[idx];

  public getCentroID(key:number){
    let returList= {};
    this.list_centros.forEach(  (item) => { 
      if (item.id == key) {
        returList = item;
      }
    });
    return returList;
  }
  
  public searchCentro = (term: string) => {
    if (!term) {
      this.showedList = [];
    } else { 
      term=term.toLowerCase();
      this.showedList = [];
      this.list_centros.forEach(  (item) => { 
        if (item.nombre.toLowerCase().includes(term) || item.direccion.toLowerCase().includes(term)) {
          this.showedList.push(item);
        }
      });
      return this.showedList;
    }

  }

}

