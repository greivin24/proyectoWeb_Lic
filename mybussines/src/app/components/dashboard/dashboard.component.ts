import { Component, OnInit } from '@angular/core'; 

import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data/data.service';
import { FirebaseService } from '../../services/firebase.service';
import { ImagenesService } from '../../services/imagenes.service';
import { DataStorageService } from '../../localstorage/data-storage.service';

import { Noticia, CentroTuristico } from '../../interfaces/interface';


import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileItem } from 'src/app/models/file-item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  //-----
  user:any;
  userAdmin:boolean = true;
  mostarNoticia:boolean=true;

  listNoticias:any={};
  listNoticiastFullLoad:boolean=false;
  listCentros:any={};
  listCentrosFullLoad:boolean= false;  //-----

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

  constructor(private activatedRouter: ActivatedRoute, private firebaseService:FirebaseService, private dataStorageService:DataStorageService, private httpClientModule:HttpClientModule, private imagenesService: ImagenesService) {
    this.activatedRouter.params.subscribe( params =>{
      this.firebaseService.getUser(params['id']).subscribe(result=>{
        this.user = result;

        if(this.user.rol =="Administrador"){
          this.userAdmin = true;
          this.cargarTodo();
        }else
          this.userAdmin = false;
          this.btnCargarMyCentros();
      })
    })
   }

  ngOnInit() {}

  cargarTodo(){
    this.cargarNoticas();
    this.cargarCentros();
    this.cargarEditores();
  }

  cargarNoticas(){
    //Carga de la lista de noticias
    this.firebaseService.gets("noticias").subscribe(res=>{
      this.listNoticias = {};
      this.listNoticias = this.firebaseService.fromObjetcToArray(res);
      this.listNoticiastFullLoad = true;
    });  
  }

  cargarCentros(){
  //Carga de la lista de centros
    this.firebaseService.gets("centros").subscribe(res=>{
      this.listCentros = {};
      this.listCentros = this.firebaseService.fromObjetcToArray(res);
      this.listCentrosFullLoad = true;
    });
  }

  cargarEditores(){
    //Carga de la lista de editores
    this.firebaseService.getUsers().subscribe(result =>{
      this.listEditors = [];
      for (const key in result) {
        if(result[key].rol == "Editor")
          this.listEditors.push(result[key])
      }
    });
  }

  btnMostrar(val:string){
    if(val != "noticias")
      this.mostarNoticia = false;
    else
      this.mostarNoticia = true;
  }


  //--------------ADMINISTRADOR-------------------------------//

  //--------------Noticias

  btnSearchNoticia(val:string){
    // if(val != "")
    //   this.listNoticias = this.dataService.searchNoticia(val);
    // else
    //   this.listNoticias = this.dataService.getNoticiasList();
  }


  btnCrearNoticia(val:NgForm){
    let newNoticia = new Noticia( val.value.titulo, val.value.sub ,val.value.fecha, val.value.desc );
    this.firebaseService.post(newNoticia, "noticias").subscribe ((result:any) =>{
        newNoticia.id = result.name;
        this.firebaseService.put(newNoticia, "noticias", result.name).subscribe(res=>{
          this.imagenesService.loadImgToFirebase(this.filesUp, "noticias", newNoticia);
          this.clerFiles();      
      })    
    });
      val.reset();
  }

  btnSeleccionEditNoticia(key:any){
    this.noticiaEdit = {};
    this.firebaseService.get("noticias/"+key).subscribe(res=>{
      this.noticiaEdit = res;
      this.isNuevaNoticia = false;
    })
    
  }
  
  btnEliminarNoticia(key){
    this.firebaseService.delete("noticias/"+key).subscribe(res=>{
      this.cargarNoticas();
    });
  }

  btnSeleccionNuevaNoticia(){
    this.isNuevaNoticia = true;
    this.noticiaEdit = {};
  }

   btnEditarNoticia(val:NgForm){
    this.noticiaEdit.nombre = val.value.titulo;
    this.noticiaEdit.sub = val.value.sub;
    this.noticiaEdit.descripcion = val.value.desc;

    this.firebaseService.put(this.noticiaEdit, "noticias", this.noticiaEdit.id).subscribe(res=>{
      this.cargarNoticas();
    })
    
  }


  

//--------------Centros

  btnEliminarCentro(key){
    this.firebaseService.delete("centros/"+key).subscribe(res=>{
      this.cargarCentros();
    });
  }
  
  btnAsignarCentro(key){
    this.idCentro = key;
  }

  btnCrearCentro(val:NgForm){
   
    let newCentro = new CentroTuristico(val.value.nombre, val.value.direccion, val.value.telefono, val.value.horarios, val.value.historia, val.value.video, val.value.descripcion);
    this.firebaseService.post(newCentro, "centros").subscribe ((result:any) =>{
      console.log(result);
      newCentro.id = result.name;
        this.firebaseService.put(newCentro, "centros", result.name).subscribe(res=>{
          this.imagenesService.loadImgToFirebase(this.filesUp, "centros", newCentro);
          //this.clerFiles();      
      })    
    });
     // val.reset();
  }

  

  btnAsignar(userKey){
    let data = [{
      "uid":userKey,
      "centroid":this.idCentro
    }];

    
  }


  //--------------EDITOR-------------------------------//

  btnCargarMyCentros(){
    // this.listMyCentros = [];
    // let list = this.dataStorageService.getObjectValue("CentrosXEditor");
    // console.log(list);
    //       if(list != null){
    //         list.forEach(  (i) => { 
    //           console.log("user: "+this.user.uid+" centroID:"+i.uid);
    //           if(i.uid == this.user.uid){
    //             this.listMyCentros.push(this.dataService.getCentroID(i.centroid));
    //           }
    //         });
    //         // for (const i of list) {

    //         // }
    //         console.log(this.listMyCentros);
    //        //console.log(this.dataService.getCentroID(2))
    //       }
  }

  btnSeleccionarCentro(key){
    // this.centroEditID = key;
    // this.centroEdit = {};
    // this.centroEdit = this.dataService.getCentroID(key);
  }

  btnEditarCentro(val:NgForm){
    // let data:any ={
    //   "id":this.centroEdit.id,
    //   "nombre": val.value.nombre,
    //   "imagen":this.centroEdit.imagen,
    //   "direccion":val.value.direccion,
    //   "ruta": this.centroEdit.ruta,
    //   "telefono":val.value.telefono,
    //   "horarios":val.value.horarios,
    //   "valoraciones":this.centroEdit.valoraciones,
    //   "seguidores":this.centroEdit.seguidores,
    //   "historia":val.value.historia,
    //   "video":val.value.video,
    //    "descripcion":val.value.descripcion
    // };

    // this.dataService.list_centros.splice(this.centroEdit.id, 1);
    // this.dataService.list_centros.push(data);
    // val.reset();
    // this.centroEdit = {};
    // this.btnCargarMyCentros();
  }



  // ---------------------------------------------------------------CARGAR IMAGENES 

  uploadImag(){
   // console.log(this.imagenesService.loadIMG(this.filesUp, "noticias", "0001g"));
  }

  clerFiles(){
    this.filesUp = [];
  }


}
