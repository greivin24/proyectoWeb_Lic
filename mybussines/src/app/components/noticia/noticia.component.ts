import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as AOS from 'aos';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  noticia:any = {};
  constructor(private activatedRouter: ActivatedRoute, private firebaseService:FirebaseService) { 

    this.activatedRouter.params.subscribe( params =>{
      this.firebaseService.get("noticias/"+params['id']).subscribe(ret=>{
        this.noticia = ret;
      })
    })

  }

  ngOnInit() {
    AOS.init();
  }

}
