import { FileItem } from '../models/file-item';
import { Observable } from 'rxjs';

export interface NavbarOpc{
    nombre:string,
    router_link:string
  }

export interface Usuario{
   nombre:string,
   apellido:string,
}

export interface UserAuth{
  uid?:string,
  email:string,
  photoURL?:string,
  displayName?: string,
  rol?:string
}

export class Comment{
  comentario:string;
  imagen:string;
}

export interface imgURL{
  name:string;
  url:string;
}


export class Noticia{
  id:string;
  nombre: string;
  sub: string;
  fecha: string;
  descripcion: string;
  imgs:any;
  

  constructor (pNombre, pSub, pFecha, pDesc){
    this.nombre = pNombre;
    this.sub = pSub;
    this.fecha = pFecha;
    this.descripcion = pDesc;
  }
}

export class CentroTuristico{
  id:string;
  nombre: string;
  dirreccion: string;
  telefono: string;
  horarios: string;
  valoracion: string;
  seguidores: string;
  historia: string;
  video: string;
  descripcion: string;
  imgs:any;
  subcriptores:any;
  comentarios:any;

  constructor (pnombre:string, pdirreccion:string, ptelefono:string, phorarios:string, phistoria:string, pvideo:string, pdescripcion:string){
    
    this.nombre = pnombre;
    this.dirreccion = pdirreccion;
    this.telefono = ptelefono;
    this.horarios = phorarios;
    this.valoracion = "0";
    this.seguidores = "0";
    this.historia = phistoria;
    this.video = pvideo;
    this.descripcion = pdescripcion;
    this.subcriptores = [];
    this.comentarios = [];
  }
}

export class Subcriptor{
  id:string;
  uid:string;
  url:string;
  cid:string;
  urank:string;
  constructor(puid:string, purl:string, pcid:string) {
    this.uid = puid;
    this.url = purl;
    this.cid = pcid;
    this.urank = "0";
  }
}


export class Propietario{
  id:string;
  uid:string;
  displayName: string;
  url:string;
  cid:string;
  constructor(puid:string, purl:string, pnombre:string,  pcid:string) {
    this.uid = puid;
    this.url = purl;
    this.displayName = pnombre;
    this.cid = pcid;
  }
}

export class Comments{
  id:string;
  uid:string;
  url:string;
  cid:string;
  comment:string;
  constructor(puid:string, purl:string, pcid:string, pcoment:string) {
    this.uid = puid;
    this.url = purl;
    this.cid = pcid;
    this.comment = pcoment;
  }
}


export class Upload {

  $key: string;
  file:File;
  name:string;
  url:string;
  progress:number; 
  createdAt: Date = new Date();

  constructor(file:File) {
    this.file = file;
  }
}

export class Mensaje{
  nombre:string;
  email:string;
  id:string;
  msj:string;

  constructor( pnombre:string, pemail:string, pmsj:string,) {
    this.nombre = pnombre;
    this.email = pemail;
    this.msj = pmsj;
  }

}
