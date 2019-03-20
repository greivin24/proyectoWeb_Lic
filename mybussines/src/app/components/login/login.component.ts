import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/interface';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario = {
    "nombre":"",
    "apellido":""
  }
  constructor(private usuariosService:UsuariosService) { }

  ngOnInit() {

  }

  guardarUser(){
    this.usuariosService.setUser( this.usuario).subscribe((result:any)=>{
      console.log(result.name);
    });
  }

}
