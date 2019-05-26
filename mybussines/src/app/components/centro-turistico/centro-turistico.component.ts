import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { DataStorageService } from '../../localstorage/data-storage.service';

import { EmbedVideoService } from 'ngx-embed-video';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

import { UserAuth, Subcriptor , Comments } from '../../interfaces/interface';
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
  centro:any ={};
  centroFullLoad:boolean=false;
  youtube_iframe_html: any;

  // lista de comentarios y seguidores
  list_commets:any[]=[];
  list_subscribers:any[]=[];


  user:UserAuth;
  isAnonimo:boolean = false;
  haveSubcripbers:boolean= false;
  inputComment:string;


  constructor(private activatedRouter: ActivatedRoute, private dataService:DataService, config:NgbRatingConfig, private embedVideo:EmbedVideoService, private dataStorageService:DataStorageService, private firebaseService:FirebaseService) { 
    config.max = 5;
    config.readonly = true;
   }

  ngOnInit() { 
    this.getCentro();
    this.btnloadComments();
    this.btnLoadSubscribers();
  }

   ngOnDestroy() {

   }


  getCentro(){

    this.user = this.dataStorageService.getObjectValue("online");
    this.activatedRouter.params.subscribe( params =>{
      this.firebaseService.get("centros/"+params['id']).subscribe(ret=>{
        this.centro = ret;
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
      this.firebaseService.put(sub, "subcriptores", sub.id).subscribe(ret=>{})
      this.list_subscribers.push(sub);
      this.btnLoadSubscribers();
    })
  }


  btnGetRol(user){
    if(user.rol == "Anonimo")
      this.isAnonimo = true;
  }
  
  
  btnloadComments(){
    this.firebaseService.gets("comentarios").subscribe(res=>{
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



}
