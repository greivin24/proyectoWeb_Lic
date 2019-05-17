import { Component, OnInit } from '@angular/core'; 

import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data/data.service';
import { FirebaseService } from '../../services/firebase.service';
import { ImagenesService } from '../../services/imagenes.service';
import { DataStorageService } from '../../localstorage/data-storage.service';

import { Noticia } from '../../interfaces/interface';


import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileItem } from 'src/app/models/file-item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:any;
  userAdmin:boolean = true;
  mostarNoticia:boolean=true;
  listNoticias:any[]=[];
  listCentros:any[]=[];

  //file preview
  selecetdFile : File;
  verImagen:boolean= false;
  imagePreview: any;

  //file upload firebase
   filesUp: FileItem[] = [];
   isHover: boolean = false;

  //Nueva noticia
  //data= new Noticia;
  isNuevaNoticia:boolean=true;
  noticiaEdit:any={};

  // Asignar centro a usuario
  idCentro:any;
  listEditors:any[] = [];

  //Mis Centros
  listMyCentros:any[]=[];
  centroEditID:string;
  centroEdit:any = {};

  constructor(private activatedRouter: ActivatedRoute, private dataService:DataService, private firebaseService:FirebaseService, private dataStorageService:DataStorageService, private httpClientModule:HttpClientModule, private imagenesService: ImagenesService) {
    this.activatedRouter.params.subscribe( params =>{
      this.firebaseService.getUser(params['id']).subscribe(result=>{
        this.user = result;

        if(this.user.rol =="Administrador"){
          this.userAdmin = true;
          this.listNoticias = this.dataService.getNoticiasList();
          console.log(this.listNoticias);
          this.listCentros = this.dataService.getCentrosList();
          this.firebaseService.getUsers().subscribe(result =>{
              
            for (const key in result) {
              if(result[key].rol == "Editor")
                this.listEditors.push(result[key])
            }

          })
        }else
          this.userAdmin = false;
          this.btnCargarMyCentros();
      })
    })
   }

  ngOnInit() {}


  btnMostrar(val:string){
    if(val != "noticias")
      this.mostarNoticia = false;
    else
      this.mostarNoticia = true;
  }


  //--------------ADMINISTRADOR-------------------------------//

  //--------------Noticias

  btnSearchNoticia(val:string){
    if(val != "")
      this.listNoticias = this.dataService.searchNoticia(val);
    else
      this.listNoticias = this.dataService.getNoticiasList();
  }

  onFileUpload(event){
    this.selecetdFile = event.target.files[0];
    const Imgreader = new FileReader();
    Imgreader.onload = () => {
      this.imagePreview = Imgreader.result;
    };
    this.verImagen = true;
    Imgreader.readAsDataURL(this.selecetdFile);
  } 

  btnCrearNoticia(val:NgForm){
    // let data:any ={
    //   "id":this.listNoticias.length,
    //  "nombre": val.value.titulo,
    //  "sub":val.value.sub,
    //  "fecha":val.value.fecha,
    //   "descripcion": val.value.desc
    // };
    

    let newNoticia = new Noticia( val.value.titulo, val.value.sub ,val.value.fecha, val.value.desc );
    this.firebaseService.post(newNoticia, "noticias").subscribe (result =>{
      newNoticia.id = result[0]; 
      debugger
      console.log(newNoticia.id);
      // this.firebaseService.put(newNoticia, "noticias", newNoticia.id.toString()).subscribe (result =>{
      //   this.imagenesService.loadImgToFirebase(this.filesUp, "Noticias", newNoticia.id.toString());
      // });
      //val.reset();
    });

    //console.log(data);
    //this.listNoticias.push(data);
    //console.log(this.listNoticias);
    //val.resetForm();
  }

  btnSeleccionEditNoticia(key){
    this.noticiaEdit = {};
    this.noticiaEdit = this.dataService.getNoticiaID(key);
    console.log(this.noticiaEdit);
    this.isNuevaNoticia = false;
  }

  btnSeleccionNuevaNoticia(){
    this.isNuevaNoticia = true;
  }

   btnEditarNoticia(val:NgForm){
    let data:any ={
      "id":this.noticiaEdit.id,
     "nombre": val.value.titulo,
     "imagen": this.noticiaEdit.imagen,
     "ruta": this.noticiaEdit.ruta,
     "sub":val.value.sub,
     "fecha":this.noticiaEdit.fecha,
      "descripcion": val.value.desc
    };
    this.listNoticias.splice(this.noticiaEdit.id, 1);
    val.reset();
    this.noticiaEdit = {};
    this.listNoticias.push(data);
    
  }


  btnEliminarNoticia(index){
    this.listNoticias.splice(index, 1);
  }

//--------------Centros

  btnEliminarCentro(index){
    this.listCentros.splice(index, 1);
  }

  btnCrearCentro(val:NgForm){
    let data:any ={
      "id":this.listCentros.length,
      "nombre": val.value.nombre,
      // imagen": val.value.fileC,
      "imagen":"1.jpg",
      "direccion":val.value.direccion,
      "ruta": "c4",
      "telefono":val.value.telefono,
      "horarios":val.value.horarios,
      "valoraciones":"1",
      "seguidores":"0",
      "historia":val.value.historia,
      "video":val.value.video,
       "descripcion":val.value.descripcion
    };

    this.listCentros.push(data);
    //console.log(this.listCentros);
    val.resetForm();
  }

  btnAsignarCentro(key){
    this.idCentro = key;
  }

  btnAsignar(userKey){
    let data = [{
      "uid":userKey,
      "centroid":this.idCentro
    }];
    let listExC = this.dataStorageService.getObjectValue("CentrosXEditor");
    if(listExC == null){
      this.dataStorageService.setObjectValue("CentrosXEditor", data);
    }else{
      listExC.push(data[0]);
      this.dataStorageService.setObjectValue("CentrosXEditor", listExC);
    }
    
  }


  //--------------EDITOR-------------------------------//

  btnCargarMyCentros(){
    this.listMyCentros = [];
    let list = this.dataStorageService.getObjectValue("CentrosXEditor");
    console.log(list);
          if(list != null){
            list.forEach(  (i) => { 
              console.log("user: "+this.user.uid+" centroID:"+i.uid);
              if(i.uid == this.user.uid){
                this.listMyCentros.push(this.dataService.getCentroID(i.centroid));
              }
            });
            // for (const i of list) {

            // }
            console.log(this.listMyCentros);
           //console.log(this.dataService.getCentroID(2))
          }
  }

  btnSeleccionarCentro(key){
    this.centroEditID = key;
    this.centroEdit = {};
    this.centroEdit = this.dataService.getCentroID(key);
  }

  btnEditarCentro(val:NgForm){
    let data:any ={
      "id":this.centroEdit.id,
      "nombre": val.value.nombre,
      "imagen":this.centroEdit.imagen,
      "direccion":val.value.direccion,
      "ruta": this.centroEdit.ruta,
      "telefono":val.value.telefono,
      "horarios":val.value.horarios,
      "valoraciones":this.centroEdit.valoraciones,
      "seguidores":this.centroEdit.seguidores,
      "historia":val.value.historia,
      "video":val.value.video,
       "descripcion":val.value.descripcion
    };

    this.dataService.list_centros.splice(this.centroEdit.id, 1);
    this.dataService.list_centros.push(data);
    val.reset();
    this.centroEdit = {};
    this.btnCargarMyCentros();
  }



  // ---------------------------------------------------------------CARGAR IMAGENES 

  uploadImag(){
    console.log(this.filesUp);
    //this.imagenesService.loadImgToFirebase(this.filesUp, "Noticias");
  }

  clerFiles(){
    this.filesUp = [];
  }


}
