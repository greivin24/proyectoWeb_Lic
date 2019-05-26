import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-centros-turisticos',
  templateUrl: './centros-turisticos.component.html',
  styleUrls: ['./centros-turisticos.component.css'],
  providers: [NgbRatingConfig]
})
export class CentrosTuristicosComponent implements OnInit {

  public centros_list:any[] = [];
  constructor(private firebaseService:FirebaseService, config:NgbRatingConfig ) { 
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    this.getCentros();
  }

  getCentros(){
      this.firebaseService.gets("centros").subscribe(ret=>{
         this.centros_list = this.firebaseService.fromObjetcToArray(ret);
      }) 
  }

  btnSearch(val:string){
    
  }

}
