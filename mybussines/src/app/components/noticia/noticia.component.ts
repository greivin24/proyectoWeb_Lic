import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data/data.service';

import * as AOS from 'aos';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  noticia:any ={};
  constructor(private activatedRouter: ActivatedRoute, private dataService:DataService) { 

    this.activatedRouter.params.subscribe( params =>{
      this.noticia = this.dataService.getNoticiaID(params['id']);
      console.log(this.noticia);
    })

  }

  ngOnInit() {
    AOS.init();
  }

}
