import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../../localstorage/data-storage.service';

import { EmbedVideoService } from 'ngx-embed-video';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

import { UserAuth, Subcriptor , Comments, CentroTuristico } from '../../interfaces/interface';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-centro-turistico',
  templateUrl: './centro-turistico.component.html',
  styleUrls: ['./centro-turistico.component.css'],
  providers: [NgbRatingConfig]
})
export class CentroTuristicoComponent implements OnInit {
  @ViewChild('comment') commentInput: ElementRef;

  currentRate = 5;
  centro:CentroTuristico;
  centroFullLoad:boolean=false;
  youtube_iframe_html: any;

  // lista de comentarios y seguidores
  list_commets:any[]=[];
  list_subscribers:any[]=[];

  user:UserAuth;
  isAnonimo:boolean = false;
  isOwner:boolean = false;
  
  haveSubcripbers:boolean= false;
  inputComment:string;
  inputCommentRespons:string;

  lat:number;
  lng:number;

  ownerCentro:any={
    "name":"",
    "img":"",
    "id":""
  } ;


  constructor(private activatedRouter: ActivatedRoute, config:NgbRatingConfig, private embedVideo:EmbedVideoService, private dataStorageService:DataStorageService, private firebaseService:FirebaseService) { 
    config.max = 5;
    config.readonly = true;
   }

  ngOnInit() { 
    this.getCentro();
    this.btnloadComments();
    this.btnLoadSubscribers();
    this.getsAsignaciones();
  }

   ngOnDestroy() {

   }

   getsAsignaciones(){
    this.firebaseService.gets("asignaciones").subscribe(result =>{
      for (const key in result) {
        if(result[key].cid == this.centro.id){
          this.ownerCentro.name = result[key].displayName;
          this.ownerCentro.img = result[key].url;
          this.ownerCentro.id = result[key].uid;
        }
        if(result[key].uid == this.user.uid && result[key].cid == this.centro.id){
          this.isOwner = true;
          break;
        } 
      }
    });

  }


  getCentro(){

    this.user = this.dataStorageService.getObjectValue("online");
    if(this.user.rol == "Anonimo")
      this.isAnonimo = true;

    this.activatedRouter.params.subscribe( params =>{
      this.firebaseService.get("centros/"+params['id']).subscribe((ret:any)=>{
        this.centro = ret;
        this.lat = this.centro.latMap;
        this.lng = this.centro.lngMap;
        this.centroFullLoad = true;
        this.youtube_iframe_html = this.embedVideo.embed(this.centro.video, {
          query: { portrait: 0, color: '333' },
          attr: { width: 350, height: 250 }
        });
      })
      
    })
  }


  


  btnComentario(){
    if(this.inputComment != ""){
      let comment = new Comments(this.user.uid, this.user.photoURL, this.centro.id, this.inputComment);
      this.firebaseService.post(comment, "comentarios").subscribe((res:any)=>{
        comment.id = res.name;
        this.firebaseService.put(comment, "comentarios", comment.id).subscribe(res=>{})
        this.list_commets.push(comment);
      })
    }
    this.inputComment = '';
    
  }

  
  btnSubscribers(){
    let sub = new Subcriptor(this.user.uid, this.user.photoURL, this.centro.id);
    this.firebaseService.post(sub, "subcriptores").subscribe((ret:any)=>{
      sub.id = ret.name;
      this.isAnonimo = true;
      this.firebaseService.put(sub, "subcriptores", sub.id).subscribe(ret=>{
        this.firebaseService.get("centros/"+this.centro.id).subscribe((res:any)=>{
          let temCentro = res;
          temCentro.seguidores = (Number(temCentro.seguidores) + 1).toString();
          this.firebaseService.put(temCentro, "centros", temCentro.id).subscribe(res=>{});
        })
      })
      this.list_subscribers.push(sub);
      this.btnLoadSubscribers();
    })
  }

  
  btnloadComments(){
    this.firebaseService.gets("comentarios").subscribe(res=>{
      if(res != null || res != '')
        this.processComments(this.firebaseService.fromObjetcToArray(res));
    })
  }

  processComments(list:any){
    this.list_commets = [];
    list.forEach(element => {
      if(this.centro.id == element.cid){
        this.list_commets.push(element);
      }
    });

  }

  btnLoadSubscribers(){
    this.firebaseService.gets("subcriptores").subscribe(res=>{
      this.processSubscribers(this.firebaseService.fromObjetcToArray(res));
    })
  }

  processSubscribers(list:any){
    this.list_subscribers = [];
    list.forEach(element => {
      if(this.centro.id == element.cid){
        this.firebaseService.get("users/"+element.uid).subscribe(res=>{
          this.list_subscribers.push(res);
          this.haveSubcripbers = true;
          if(this.user.uid == element.uid)
            this.isAnonimo = true;
        })
        
      }
    });

  }


  btnResponderComentario(idComent:string){
    
    this.firebaseService.get("comentarios/"+idComent).subscribe((res:any)=>{
      let comment:Comments = res;
      comment.respons = this.inputCommentRespons;
      comment.idRespons = this.user.uid;
      comment.imgRespons = this.user.photoURL;
      this.firebaseService.put(comment, "comentarios", idComent).subscribe(res=>{
        
        this.inputCommentRespons = "";
      });
    })

  }

  btnCensurar(key:string){
    this.firebaseService.delete("comentarios/"+key).subscribe(res=>{
      this.btnloadComments();
    })
  }



}
