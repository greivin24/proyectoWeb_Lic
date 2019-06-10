import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ImagenesService } from '../../services/imagenes.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})

export class NoticiasComponent implements OnInit {

  noticias_listFire:any[] = [];
  constructor( private firebaseService:FirebaseService, private imagenesService:ImagenesService) { }

  ngOnInit() {
    this.getsNoticias();
  }

  getsNoticias(){
    this.firebaseService.gets("noticias").subscribe(ret=>{
       this.noticias_listFire = this.firebaseService.fromObjetcToArray(ret);
    })
   
  }

}
