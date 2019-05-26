import { Observable } from 'rxjs';


export class FileItem{
   public archivo: File;
   public nombreArchivo: string;
    public url: Observable<string>;
   public url_s: string;
   public estadoSubiendo: boolean;
   public progreso: number;


   constructor(archivo:File){

    this.archivo = archivo;
    this.nombreArchivo = archivo.name;

    this.estadoSubiendo = false;
    this.progreso = 0;

   }
}