import { Component, OnInit } from '@angular/core'; 

import { ActivatedRoute } from '@angular/router';

import { FirebaseService } from '../../services/firebase.service';
import { ImagenesService } from '../../services/imagenes.service';

import { Noticia, CentroTuristico, Propietario, UserAuth } from '../../interfaces/interface';


import { NgForm } from '@angular/forms';
import { FileItem } from 'src/app/models/file-item';
import * as alertify from 'alertifyjs';

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

  constructor(private activatedRouter: ActivatedRoute, private firebaseService:FirebaseService, private imagenesService: ImagenesService) {
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
  this.listCentrosFullLoad = false;
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
    
  }


  btnCrearNoticia(val:NgForm){
    if(this.filesUp.length > 3){
      let newNoticia = new Noticia( val.value.titulo, val.value.sub ,val.value.fecha, val.value.desc );
        this.firebaseService.post(newNoticia, "noticias").subscribe ((result:any) =>{
            newNoticia.id = result.name;
            this.firebaseService.put(newNoticia, "noticias", result.name).subscribe(res=>{
              this.imagenesService.loadImgToFirebase(this.filesUp, "noticias", newNoticia);
              val.reset();
              alertify.success('Noticia registrada correctamente.');    
          })    
        });
    }else
      alertify.message('Se deben subir al menos 4 images a la noticia para Registrarla.');     
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
      alertify.success('Se borro la Noticia correctamente.');
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
      alertify.success('Se Edito la Noticia correctamente.');
    })
    
  }

//--------------Centros
  btnSearchCentro(val:string){
    
  }

  btnEliminarCentro(key){
    this.firebaseService.delete("centros/"+key).subscribe(res=>{
      this.cargarCentros();
      alertify.success('Se borro el Centro correctamente.');
    });
  }
  
  btnAsignarCentro(key){
    this.idCentro = key;
  }

  btnCrearCentro(val:NgForm){
    if(this.filesUp.length > 3){
      let newCentro = new CentroTuristico(val.value.nombre, val.value.direccion, val.value.telefono, val.value.horarios, val.value.historia, val.value.video, val.value.descripcion);
      this.firebaseService.post(newCentro, "centros").subscribe ((result:any) =>{
        newCentro.id = result.name;
          this.firebaseService.put(newCentro, "centros", result.name).subscribe(res=>{
            this.imagenesService.loadImgToFirebase(this.filesUp, "centros", newCentro);
            this.cargarCentros(); 
            val.reset();   
            alertify.success('Se Registro el Centro correctamente.');  
          })    
      });
    }else
          alertify.message('Se deben subir al menos 4 images a la noticia para Registrarla.');  
  }

  
  btnAsignar(userKey){
    let temUser:UserAuth;
    this.firebaseService.gets("asignaciones").subscribe(result =>{
      let asignarCentro:boolean=true;
      for (const key in result) {
        if(result[key].cid == this.idCentro){
          asignarCentro= false;
          break;
        } 
      }

      if(asignarCentro){
        this.firebaseService.get("users/"+userKey).subscribe((ret:any)=>{
          temUser = ret;
          let asignar = new Propietario(temUser.uid, temUser.photoURL, temUser.displayName, this.idCentro);
          this.firebaseService.post(asignar, "asignaciones").subscribe((ret:any)=>{
            asignar.id = ret.name;
            this.firebaseService.put(asignar, "asignaciones", asignar.id).subscribe(ret=>{
              alertify.success('Se Asigno el Centro correctamente a '+temUser.displayName+ '.');  
            });
          }) 
        }) 
      }else
      alertify.message('El Centro seleccionado ya esta asignado a otro editor'); 
    });

  }


  //--------------EDITOR-------------------------------//

  btnCargarMyCentros(){
    //Carga de la lista de Mis Centros
    let temListMyCentros:any=[];
    this.listMyCentros = [];
    this.firebaseService.get("asignaciones").subscribe(result =>{
      for (const key in result) {
        if(result[key].uid == this.user.uid)
          temListMyCentros.push(result[key])
      }

      for (const key in temListMyCentros) {
        this.firebaseService.get("centros/"+temListMyCentros[key].cid).subscribe(res=>{
          this.listMyCentros.push(res);
        })
        
      }
    });
  }

  btnSeleccionarCentro(key){
    this.centroEdit = {};
    this.firebaseService.get("centros/"+key).subscribe(res=>{
      this.centroEdit = res;
    })
  }

  btnEditarCentro(val:NgForm){

    this.centroEdit.nombre = val.value.nombre;
    this.centroEdit.dirreccion = val.value.dirreccion;
    this.centroEdit.telefono = val.value.telefono;
    this.centroEdit.horarios = val.value.horarios;
    this.centroEdit.historia = val.value.historia;
    this.centroEdit.video = val.value.video;
    this.centroEdit.descripcion = val.value.descripcion;
    this.firebaseService.put(this.centroEdit, "centros", this.centroEdit.id).subscribe(res=>{
      alertify.success('Se Edito el Centro correctamente.');
    })

  }

  clerFiles(){
    this.filesUp = [];
  }


}
