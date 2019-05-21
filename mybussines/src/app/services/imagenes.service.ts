import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FirebaseService } from './firebase.service';

import { FileItem } from '../models/file-item';





@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  private CARPETA = "img";
  constructor(private angularFirestore:AngularFirestore, private firebaseService:FirebaseService  ){}

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
              //console.log("imagen: "+item.nombreArchivo+ "URL: "+item.url);
              item.estadoSubiendo = false;
            }
      
       
    
       }
    
  }

prueba(imgs: FileItem[]){
    const staregeRef = firebase.storage().ref();
     for (const item of imgs) {
        item.estadoSubiendo = true;
        if(item.progreso >= 100){
          continue;
        }
          
          const uploadTask: firebase.storage.UploadTask = staregeRef.child(`${this.CARPETA}/ ${item.nombreArchivo}`).put(item.archivo);
            uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, 
            ( snapshot: firebase.storage.UploadTaskSnapshot)=> item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            ( error ) => console.error('Error al subir ', error),
            () =>{
              console.log("imagen cargada corrctamente: "+item.nombreArchivo);
              item.url = uploadTask.snapshot.downloadURL;
              item.estadoSubiendo = false;
              this.saveImage({
                nombre:item.nombreArchivo,
                url:item.url
              });
            }
      
       
    
       }
  }


  cant(imgs: FileItem[]){
    console.log(imgs.length);
  }


  prueba2(imgs: FileItem[], nodo:string, key: string){

    const staregeRef = firebase.storage().ref();
    const cantImg = imgs.length;
    let listImg :FileItem[]=[];
     for (const item of imgs) {
        item.estadoSubiendo = true;
        if(item.progreso >= 100){
          continue;
        }
          
          const uploadTask: firebase.storage.UploadTask = staregeRef.child(`${nodo} / ${key} / ${item.nombreArchivo}`).put(item.archivo);
          //const uploadTask: firebase.storage.UploadTask = staregeRef.child(`${this.CARPETA}/ ${item.nombreArchivo}`).put(item.archivo);
          uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded 
            item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {
            // Handle unsuccessful uploads
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              item.url = downloadURL;
              item.estadoSubiendo = false;
              listImg.push(item);
              console.log('File available at', downloadURL);
              if(cantImg == listImg.length){
                console.log('termonando con el return');
                return listImg;
              }
                
            });
          });
      
       
    
       }
       
       console.log("Termina la funcion");
       return listImg;
       
  }


  private saveImage(data: {nombre:string, url:string}){
    this.angularFirestore.collection(`/${this.CARPETA}` ).add( data );
  }

  public getsImgFromNode(carpeta:string, node:string){
    let storeRef = firebase.storage();
    let path = storeRef.ref(`${carpeta} / ${node} / cropped-logo.png`);
    console.log(path.getDownloadURL());
  // const storeRef = this.angularFirestore.collection(`${carpeta} / ${node}`);
    
   
  }



  
}
