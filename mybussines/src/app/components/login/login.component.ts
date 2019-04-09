import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../localstorage/data-storage.service';
import { Router } from '@angular/router';
import { Observable, of } from "rxjs";

import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';

import { UserAuth } from '../../interfaces/interface';
import { NgForm } from '@angular/forms';


import * as AOS from 'aos';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  puruebaUser:Observable<UserAuth>;

  user:UserAuth = {
    "uid":"",
    "email": "anomimo@gmail.com",
    "photoURL": "https://sergiocunduri.webcindario.com/images/logo.png",
    "displayName": "Anonimo",
    "rol": "Anonimo"
  }

  constructor(private firebaseService:FirebaseService, private dataStorageService:DataStorageService, public authService:AuthService, private router:Router) { }

  ngOnInit() {
    AOS.init();
  }

  btnLoginAnonimo(){
    this.user.rol = "Anonimo";
    this.dataStorageService.setObjectValue("online", this.user);
    this.router.navigate(['/home/noticias']);
  }

  btnLogin(val:NgForm){
      this.authService.loginEmailPass(val.value.email.trim(), val.value.pass.trim());
      this.authService.user$.subscribe((result:any)=>{

        if(result !=null){
          this.firebaseService.getUser(result.uid).subscribe(res=>{
            if(res == null){
              result.displayName = result.email.split("@")[0];
              result.photoURL = "https://colegio.santamariadelmar.org/imagenes/128x128/female_male_users.png";
              result.rol = "Basico";
              this.firebaseService.postNewUser(result);
              this.dataStorageService.setObjectValue("online", result);
            }else{
              this.dataStorageService.setObjectValue("online", res);
            }
             this.router.navigate(['/home/noticias']); 
          })
          
        }
      });
  }

  btnLoginGoogle(){
    this.authService.googleSingIn();
    this.authService.user$.subscribe((result:any)=>{
      if(result !=null){
        this.firebaseService.getUser(result.uid).subscribe(res=>{
          if(res == null){
            this.firebaseService.postNewUser(result);
            this.dataStorageService.setObjectValue("online", result);
          }else{
            this.dataStorageService.setObjectValue("online", res);
          }
           this.router.navigate(['/home/noticias']); 
        })
        
      }
    });
  }

}
