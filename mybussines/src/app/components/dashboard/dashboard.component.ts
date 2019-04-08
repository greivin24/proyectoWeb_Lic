import { Component, OnInit } from '@angular/core'; 

import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { FirebaseService } from '../../services/firebase.service';
import { DataStorageService } from '../../localstorage/data-storage.service';


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

  constructor(private activatedRouter: ActivatedRoute, private dataService:DataService, private firebaseService:FirebaseService, private dataStorageService:DataStorageService) {
    this.activatedRouter.params.subscribe( params =>{
      this.firebaseService.getUser(params['id']).subscribe(result=>{
        this.user = result;

        if(this.user.rol =="Administrador"){
          this.userAdmin = true;
          this.listNoticias = this.dataService.getNoticiasList();
        }else
          this.userAdmin = false;
      })
    })
   }

  ngOnInit() {
  }

  btnSearchNoticia(val:string){
    if(val != "")
      this.listNoticias = this.dataService.searchNoticia(val);
    else
      this.listNoticias = this.dataService.getNoticiasList();
  }

  btnMostrar(val:string){
    if(val != "noticias")
      this.mostarNoticia = false;
    else
      this.mostarNoticia = true;
  }

}
