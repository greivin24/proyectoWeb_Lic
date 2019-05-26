import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

import * as AOS from 'aos';
import * as alertify from 'alertifyjs';
import { Mensaje } from 'src/app/interfaces/interface';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private firebaseService:FirebaseService) { }

  ngOnInit() {
    AOS.init();
  }

  btnEnviarMsj(val:NgForm){

    let data = new Mensaje(val.value.nombre, val.value.email, val.value.msj);
    this.firebaseService.post(data, "casillero").subscribe ((res:any) =>{
      data.id = res.name;
      this.firebaseService.put(data, "casillero", data.id).subscribe(res=>{
        alertify.success("Mensaje recibido exitosamente, pronto estaremos en contacto.");
        val.reset();
      })
      
    })
    
  }

}
