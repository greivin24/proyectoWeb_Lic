import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data/data.service';

import { EmbedVideoService } from 'ngx-embed-video';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

import { Comment } from '../../interfaces/interface';


@Component({
  selector: 'app-centro-turistico',
  templateUrl: './centro-turistico.component.html',
  styleUrls: ['./centro-turistico.component.css'],
  providers: [NgbRatingConfig]
})
export class CentroTuristicoComponent implements OnInit {

  currentRate = 5;
  centro:any;
  youtube_iframe_html: any;

  list_commets:Array<any> = [{ }];
 

  constructor(private activatedRouter: ActivatedRoute, private dataService:DataService, config:NgbRatingConfig, private embedVideo:EmbedVideoService) { 
    config.max = 5;
    config.readonly = true;

    this.activatedRouter.params.subscribe( params =>{
      this.centro = this.dataService.getCentro(params['id']);
      console.log(this.centro);
      this.youtube_iframe_html = this.embedVideo.embed(this.centro.video, {
        query: { portrait: 0, color: '333' },
        attr: { width: 350, height: 250 }
      });
    })
   }

  ngOnInit() {
  }

  btnComentario(val:any){
    if(val != ""){
      let coment:Comment = new Comment();
      coment.comentario = val;
      coment.imagen = "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1";
      this.list_commets.push(coment);
    }
  }

}
