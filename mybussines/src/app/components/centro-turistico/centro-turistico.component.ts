import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data/data.service';


import { EmbedVideoService } from 'ngx-embed-video';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private activatedRouter: ActivatedRoute, private dataService:DataService, config:NgbRatingConfig, private embedVideo:EmbedVideoService) { 
    config.max = 5;
    config.readonly = true;

    this.activatedRouter.params.subscribe( params =>{
      this.centro = this.dataService.getCentro(params['id']);
      console.log(this.centro);
      this.youtube_iframe_html = this.embedVideo.embed(this.centro.video, {
        query: { portrait: 0, color: '333' },
        attr: { width: 640, height: 360 }
      });
    })
   }

  ngOnInit() {
  }

}
