import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { DataStorageService } from '../../localstorage/data-storage.service';

import { EmbedVideoService } from 'ngx-embed-video';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

import { Comment } from '../../interfaces/interface';


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
  youtube_iframe_html: any;

  // lista de comentarios y seguidores
  list_commets:Array<any> = [{ }];
  list_subscribers:Array<any> = [{ }];

  user:any;
  isAnonimo:boolean = false;

  constructor(private activatedRouter: ActivatedRoute, private dataService:DataService, config:NgbRatingConfig, private embedVideo:EmbedVideoService, private dataStorageService:DataStorageService) { 
    config.max = 5;
    config.readonly = true;

    this.activatedRouter.params.subscribe( params =>{
      this.user = this.dataStorageService.getObjectValue("online");
      this.centro = this.dataService.getCentroID(params['id']);
      console.log(this.centro);
      this.youtube_iframe_html = this.embedVideo.embed(this.centro.video, {
        query: { portrait: 0, color: '333' },
        attr: { width: 350, height: 250 }
      });
    })
   }

  ngOnInit() {  
    //Cargar los comentarios
    this.btnloadComments();

    //Cargar los suscriptores 
    this.btnLoadSubscribers();

    //Revisa el rol del usuario
    this.btnGetRol(this.user);
  }

  ngOnDestroy() {
    //Guardar los comentarios
    this.dataStorageService.setObjectValue(this.centro.nombre.trim()+"_Comments", this.list_commets);

    //Guardar los subcriptores
    this.dataStorageService.setObjectValue(this.centro.nombre.trim()+"_Subscribers", this.list_subscribers);
  }


  btnloadComments(){
    //Cargar los comentarios
    this.list_commets = this.dataStorageService.getObjectValue(this.centro.nombre.trim()+"_Comments");
    if(this.list_commets == null)
      this.list_commets = [];
  }


  btnLoadSubscribers(){
    //Cargar los suscriptores 
    this.list_subscribers = this.dataStorageService.getObjectValue(this.centro.nombre.trim()+"_Subscribers");
    if(this.list_subscribers == null)
      this.list_subscribers = [];
  }


  btnComentario(val:any){
    if(val != ""){
      let coment:Comment = new Comment();
      coment.comentario = val;
      coment.imagen = this.user.photoURL;
      this.list_commets.push(coment);
      this.commentInput.nativeElement.value = '';
    }
  }

  btnSubscribers(){
    let exist:boolean=false;
    for (let index = 0; index < this.list_subscribers.length; index++) {
      if(this.list_subscribers[index]["uid"] == this.user.uid){
        exist = true;
        break;
      }
    }
    if(exist == false){
      this.list_subscribers.push(this.user);
      this.dataStorageService.setObjectValue(this.centro.nombre.trim()+"_Subscribers", this.list_subscribers);
      this.btnLoadSubscribers();
    }
    
  }

  btnGetRol(user){
    if(user.rol == "Anonimo")
      this.isAnonimo = true;
  }

}
