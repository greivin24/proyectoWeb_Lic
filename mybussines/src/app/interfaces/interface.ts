import { FileItem } from '../models/file-item';

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
  listImg: FileItem[];
  imgs:any;

  constructor (pNombre, pSub, pFecha, pDesc){
    this.nombre = pNombre;
    this.sub = pSub;
    this.fecha = pFecha;
    this.descripcion = pDesc;
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
