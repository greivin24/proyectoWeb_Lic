import {  Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';
import { Noticia, CentroTuristico, Propietario, UserAuth } from '../../interfaces/interface';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-rating-custom',
  templateUrl: './rating-custom.component.html',
  styleUrls: ['./rating-custom.component.css']
})
export class RatingCustomComponent implements OnInit {

  private rating: number;
  @Input("currating") set inputrating (value:number){
      this.rating=value;
  }
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  

  constructor() { 
  }

  inputName: string;
  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  }
  onClick(inputrating: number): void {
    this.rating = inputrating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: this.rating 
    });
  }
}
