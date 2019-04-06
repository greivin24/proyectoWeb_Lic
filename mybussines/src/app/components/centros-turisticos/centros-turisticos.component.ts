import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-centros-turisticos',
  templateUrl: './centros-turisticos.component.html',
  styleUrls: ['./centros-turisticos.component.css'],
  providers: [NgbRatingConfig]
})
export class CentrosTuristicosComponent implements OnInit {

  currentRate = 5;
  public centros_list:any[] = [];
  constructor(private dataService:DataService, config:NgbRatingConfig ) { 
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    this.centros_list = this.dataService.getCentrosList();
  }

  btnSearch(val:string){
    if(val != ""){
      this.centros_list = this.dataService.searchCentro(val);
    }else
      this.centros_list = this.dataService.getCentrosList();
  }

}
