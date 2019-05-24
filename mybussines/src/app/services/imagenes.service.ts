import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FirebaseService } from './firebase.service';

import { FileItem } from '../models/file-item';
import { promise } from 'protractor';
import { imgURL, Upload } from '../interfaces/interface';





@Injectable({
  providedIn: 'root'
})
export class ImagenesService {


  private CARPETA = "Noticias";
  constructor(private angularFirestore:AngularFirestore, public firebaseService:FirebaseService  ){}




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
            // uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, 
            // ( snapshot: firebase.storage.UploadTaskSnapshot)=> item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            // ( error ) => console.error('Error al subir ', error),
            // () =>{
            //   console.log("imagen cargada corrctamente: "+item.nombreArchivo);
            //   item.url = uploadTask.snapshot.downloadURL;
            //   item.estadoSubiendo = false;
            //   this.saveImage({
            //     nombre:item.nombreArchivo,
            //     url:item.url
            //   });
            // }
      
       uploadTask.then((UploadSnapshot: firebase.storage.UploadTaskSnapshot)=>{
         firebase.database().ref(this.CARPETA +"ima/"+item.nombreArchivo).set(UploadSnapshot.downloadURL);
         console.log("URL: "+ UploadSnapshot.downloadURL);
       })
    
       }9
  }


  cant(imgs: FileItem[]){
    console.log(imgs.length);
  }


 async prueba2(imgs: FileItem[], nodo:string, key: string){//}:Promise<FileItem[]>{

    const staregeRef = firebase.storage().ref();
    const cantImg = imgs.length;
    let listImg :FileItem[]=[];

    let promise1 = new Promise(function(resolve, reject){

      for (const item of imgs) {
        item.estadoSubiendo = true;
        if(item.progreso >= 100){
          continue;
        }
          
          const uploadTask: firebase.storage.UploadTask = staregeRef.child(`${nodo} / ${key} / ${item.nombreArchivo}`).put(item.archivo);
          uploadTask.on('state_changed', function(snapshot){
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
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              item.url = downloadURL;
              item.estadoSubiendo = false;
              listImg.push(item);
              console.log('File available at', downloadURL);
              if(cantImg == listImg.length){
                resolve();
              }
                
            });
          });
      
       
    
       }
      
    });


    promise1.then(function(){
      console.log(listImg);
      debugger
      return listImg;
      // let createJson:imgURL[] = [];

      // for (const item of listImg) {
      //   let data:imgURL;
      //   data.name = item.nombreArchivo;
      //   data.url = item.url;
      //   createJson.push(data);
      // }
  
      //let rdata = { "imgs": list };
      // fullData.imgs = listImg;
      // this.firebaseService.put(fullData, nodo, key);
    })

  
     
       
      //  console.log("Termina la funcion");
     
       
  }



  private saveImage(data: {nombre:string, url:string}){
    this.angularFirestore.collection(`/${this.CARPETA}` ).add( data );
  }

  public getsImgFromNode(carpeta:string, node:string){
    let storeRef = firebase.storage();
    let path = storeRef.ref(`${carpeta} / ${node} / `);
    console.log(path);
  // const storeRef = this.angularFirestore.collection(`${carpeta} / ${node}`);
    
  }











  // funciones del prof
  


  // private basePath: string = '/uploads';

  // pushUpload(upload: Upload, elementoNombre: string) {

  //   let storageRef = firebase.storage().ref();
  //   let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

  //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //     (snapshot) => {
  //       upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     },
  //     (error) => {
  //     },
  //     () => {
  //       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

  //         upload.url = downloadURL;
  //         upload.name = upload.file.name;
  //         this.saveFileData(upload, elementoNombre);

  //       });

  //     }
  //   );
  // }

  // private saveFileData(upload: Upload, elementoNombre: string) {

  //   this.angularFirestore.collection<Elemento>('shapes').ref.where('nombre', '==', elementoNombre).get()
  //    .then(  (querySnapshot) => {
       
  //     querySnapshot.docs.forEach(doc => {
  //       var elementRef = this.angularFirestore.collection('shapes').doc(doc.id);
      
  //       let nuevoArregloDeImagenes= doc.get('imagenes');
  //       nuevoArregloDeImagenes.push(upload.url);
       
  //       return elementRef.update({ 
  //        imagenes: nuevoArregloDeImagenes
  //       }).then(()=>{
  //         this.snotifyService.success('Se ha actualizado la información del elemento','Información');
  //       }).catch((error)=>{
  //         this.snotifyService.warning('Se ha presentado el siguiente inconveniente al guardar:'+ error,'Atención');
      
  //       });

  //     });
  //   });
  
  // }
 
  // deleteUpload(upload: Upload) {
  //   this.deleteFileFirestore(upload.$key)
  //     .then(() => {
  //       this.deleteFileStorage(upload.name)
  //     })
  //     .catch(error => console.log(error))
  // }

  // private deleteFileFirestore(id: string) {
  //   return this.angularFirestore.collection<Upload>('documents').doc(id).delete();
  // }

  // private deleteFileStorage(name: string) {
  //   let storageRef = firebase.storage().ref();
  //   storageRef.child(`${this.basePath}/${name}`).delete()
  // }




  
}
