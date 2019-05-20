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


export class Noticia{
  id:string;
  nombre: string;
  sub: string;
  fecha: string;
  descripcion: string;

  constructor (pNombre, pSub, pFecha, pDesc){
    this.nombre = pNombre;
    this.sub = pSub;
    this.fecha = pFecha;
    this.descripcion = pDesc;
  }
}