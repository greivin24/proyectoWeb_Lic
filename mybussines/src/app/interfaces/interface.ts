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
  id:number;
  nombre: string;
  imagen: string;
  ruta: string; 
  sub: string;
  fecha: string;
  descripcion: string;
}