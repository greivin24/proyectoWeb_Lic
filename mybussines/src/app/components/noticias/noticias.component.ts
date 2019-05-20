import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { FirebaseService } from '../../services/firebase.service';



@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias_list:any[] = [];
  noticias_listFire:any;
  constructor(private dataService:DataService, private firebaseService:FirebaseService) { }

  ngOnInit() {
    this.noticias_list = this.dataService.getNoticiasList();
    this.getsNoticias();
  }

  getsNoticias(){
    this.firebaseService.gets("noticias").subscribe(ret=>{
       this.noticias_listFire = ret;
       console.log(this.noticias_listFire);
    })
   
  }

}
