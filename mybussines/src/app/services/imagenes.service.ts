import { Injectable } from '@angular/core';

import { FirebaseService } from './firebase.service';

import { FileItem } from '../models/file-item';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(public firebaseService:FirebaseService, private angularFireStorage: AngularFireStorage){}
 

  loadImgToFirebase(imgs: FileItem[], nodo:string, fullData: any){

    let listImg :FileItem[]=[];

      for (const item of imgs) {
        item.estadoSubiendo = true;
        if(item.progreso >= 100){
          continue;
        }
        const refPath = nodo + '/' + fullData.id + '/' + item.nombreArchivo;

        const staregeRef = this.angularFireStorage.ref(refPath);
        const task = this.angularFireStorage.upload(refPath, item.archivo);

        task.percentageChanges().subscribe(ret=>{
          item.progreso = ret;
        })
        task.snapshotChanges().pipe(finalize(()=>{ 
          staregeRef.getDownloadURL().subscribe(rest=>{
            item.estadoSubiendo = false;
            item.url_s = rest;
            listImg.push(item);
            fullData.imgs = listImg;
            this.firebaseService.put(fullData, nodo, fullData.id).subscribe(res=>{
              console.log(res);
            });  
          })})).subscribe();
       

      }


  }


  
}
