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

  constructor(private activatedRouter: ActivatedRoute, private dataService:DataService, private firebaseService:FirebaseService, config:NgbRatingConfig, private dataStorageService:DataStorageService) { 
    config.max = 5;
    config.readonly = false;

    this.activatedRouter.params.subscribe( params =>{
      this.firebaseService.getUser(params['id']).subscribe(result=>{
        this.user = result;
        this.btnLoadCentrosSuscritos(this.user.uid);
      })
    })

  }

  ngOnInit() {
    
  }

  btnLoadCentrosSuscritos(key:string){
    this.listCentrosSuscritos = this.dataStorageService.getCentrosSuscritos(key);
   // console.log(this.listCentrosSuscritos);
  }

  btnDeleteSubcribe(index:any){
    this.listCentrosSuscritos.splice(index, 1);
  }

}
