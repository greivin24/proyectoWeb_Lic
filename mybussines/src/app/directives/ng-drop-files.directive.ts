import { Directive, EventEmitter, ElementRef, HostListener, Input, Output} from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() filesUp: FileItem[] = [];
  @Output() isHover: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any){
    this.isHover.emit( true );
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any){
    this.isHover.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any){
  
    const tranferencia = this._getTranferencia(event);
    if(!tranferencia)
      return;

    this._extraerFiles(tranferencia.files);
    this._prevenirDetener(event);
    this.isHover.emit( false );
  }

  private _getTranferencia(event:any){
    return event.dataTransfer ? event.dataTransfer : event.orinalEvent.dataTransfer;
  }

  private _extraerFiles(fileList: FileList){
    for (const key in Object.getOwnPropertyNames (fileList)) {
      
      const temFile = fileList[key];

      if (this._canLoadImage(temFile)) {
        
        if(this._cantFiles()){
          const newFile = new FileItem(temFile);
          this.filesUp.push(newFile);
        }
          
        
      }
    }
  }


  private _cantFiles(){
    if(this.filesUp.length < 4)
      return true;
    else
      return false;
  }

  // Validaciones
  private _canLoadImage(oneFile: File):boolean{
    if(!this._fileExist(oneFile.name) && this._isImagen(oneFile.type))
      return true;
    else
      return false;
  } 

  private _prevenirDetener(event){
    event.preventDefault();
    event.stopPropagation();

  }

  private _fileExist(name: string):boolean{
    for (const file of this.filesUp) {
      if( file.nombreArchivo == name){
        return true;
      }
    }
    return false;
  }

  private _isImagen(tipo:string):boolean{
    return (tipo === '' || tipo === undefined) ? false : tipo.startsWith('image');
  }
}
