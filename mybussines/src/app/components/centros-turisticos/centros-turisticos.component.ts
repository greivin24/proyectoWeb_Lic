import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-centros-turisticos',
  templateUrl: './centros-turisticos.component.html',
  styleUrls: ['./centros-turisticos.component.css'],
  providers: [NgbRatingConfig]
})
export class CentrosTuristicosComponent implements OnInit {

  public centros_list:any[] = [];
  constructor(private firebaseService:FirebaseService, config:NgbRatingConfig, private dataService:DataService ) { 
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    this.getCentros();
  }

  getCentros(){
      this.firebaseService.gets("centros").subscribe(ret=>{
         this.centros_list = this.firebaseService.fromObjetcToArray(ret);
         console.log(this.centros_list);
      }) 
  }

  btnSearch(val:string){
    if(val == '')
      this.getCentros();
    else
      this.centros_list = this.dataService.searchCentro(val, this.centros_list); 
  }

}
