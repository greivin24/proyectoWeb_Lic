import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FirebaseService } from './firebase.service';

import { FileItem } from '../models/file-item';


@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private angularFirestore:AngularFirestore, private firebaseService:FirebaseService  ) { }

  loadImgToFirebase(imgs: FileItem[], nodo:string, key: string){
    const staregeRef = firebase.storage().ref();

     for (const item of imgs) {
        item.estadoSubiendo = true;
        if(item.progreso >= 100){
          continue;
        }
          
          const uploadTask: firebase.storage.UploadTask = staregeRef.child(`${nodo} / ${key} / ${item.nombreArchivo}`).put(item.archivo);

            uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, 
            ( snapshot: firebase.storage.UploadTaskSnapshot)=> item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            ( error: any ) => console.error('Error al subir ', error),
            () =>{
              item.url = uploadTask.snapshot.downloadURL;
              item.estadoSubiendo = false;

              debugger
              console.log(item);
             
              //this.saveImage( item, `${nodo} / ${key}` );
              //this.firebaseService.setNodeName(`img${nodo}`);
              // this.firebaseService.post(data, `img${nodo}`).subscribe(res=>{
              //   console.log(res);
              // })
            }
      
       
    
       }
    
  }
  
  private saveImage(data:any, node:string){
    console.log(data);
    this.angularFirestore.collection( `/${node}` ).add( data );
  }



  
}
