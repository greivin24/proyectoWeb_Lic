import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../localstorage/data-storage.service';
import { Router } from '@angular/router';

import { UsuariosService } from '../../services/usuarios.service';
import { Usuario, User } from '../../interfaces/interface';
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

  user:User = {
    "key$": "24",
    "correo":"g@gmail.com",
    "rol":"Admin"
  }
  constructor(private usuariosService:UsuariosService, private dataStorageService:DataStorageService, private router:Router) { }

  ngOnInit() {

  }

  guardarUser(){
    this.usuariosService.setUser( this.usuario).subscribe((result:any)=>{
      console.log(result.name);
    });
  }

  btnLoginAnonimo(){
    this.user.rol = "Anonimo";
    this.dataStorageService.setObjectValue("online", this.user);
    this.router.navigate(['/home/noticias']);
  }

  btnLogin(){
    this.dataStorageService.setObjectValue("online", this.user);
    this.router.navigate(['/home/noticias']);
  }

}
