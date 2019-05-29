import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data/data.service';
import { FirebaseService } from '../../services/firebase.service';
import { UserAuth } from '../../interfaces/interface';

import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { DataStorageService } from '../../localstorage/data-storage.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  currentRate = 1;

  user:any=[];

  listCentrosSuscritos:any[]=[];
  listMySubscribers:any[]=[];

  constructor(private activatedRouter: ActivatedRoute, private dataService:DataService, private firebaseService:FirebaseService, config:NgbRatingConfig, private dataStorageService:DataStorageService) { 
    config.max = 5;
    config.readonly = false;

    this.activatedRouter.params.subscribe( params =>{
      this.firebaseService.getUser(params['id']).subscribe(result=>{
        this.user = result;
        this.btnLoadSubscribers();
      })
    })

  }

  ngOnInit() {
    
  }


  btnDeleteSubcribe(index:any){
    this.firebaseService.gets("subcriptores").subscribe(res=>{
      this.processDesSubscriber(this.firebaseService.fromObjetcToArray(res), index);
    })
  }

  processDesSubscriber(list:any, pcentroId:string){
    list.forEach(element => {
      if(this.user.uid == element.uid  &&  pcentroId == element.cid){
        this.firebaseService.delete("subcriptores/"+element.id).subscribe(res=>{
          this.btnLoadSubscribers();
        });
      }
    });
  }

  btnLoadSubscribers(){
    this.firebaseService.gets("subcriptores").subscribe(res=>{
      this.processSubscribers(this.firebaseService.fromObjetcToArray(res));
    })
  }

  processSubscribers(list:any){
    this.listMySubscribers = [];
    list.forEach(element => {
      if(this.user.uid == element.uid){
        this.firebaseService.get("centros/"+element.cid).subscribe(res=>{
          this.listMySubscribers.push(res);
          console.log(this.listMySubscribers);
        })  
      }
    });

  }

  setRank(){
    console.log(this.currentRate);
  }

}
