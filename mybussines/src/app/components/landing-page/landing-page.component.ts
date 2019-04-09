import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

import * as AOS from 'aos';
import * as alertify from 'alertifyjs';


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
    const data ={
      "nombre": val.value.nombre,
      "email": val.value.email,
      "mensaje": val.value.msj,
    }
    this.firebaseService.post(data, "casillero").subscribe (result =>{
      console.log(result);
      alertify.alert("Mensaje recibido exitosamente, pronto estaremos en contacto.");
      val.reset();
    })
  }

}
