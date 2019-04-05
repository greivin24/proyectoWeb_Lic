import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';



@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  public noticias_list:any[] = [];

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.noticias_list = this.dataService.getNoticiasList();
  }

}
