import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { CentrosTuristicosComponent } from './components/centros-turisticos/centros-turisticos.component';
import { CentroTuristicoComponent } from './components/centro-turistico/centro-turistico.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

//Servicios
import { UsuariosService } from './services/usuarios.service';

//Local Storage
import { DataStorageService } from './localstorage/data-storage.service';

//Auth Guard
import { AuthGuard } from './guards/auth-guard.service';
import { AuthAdminGuardService } from './guards/auth-admin-guard.service';


// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { PerfilComponent } from './components/perfil/perfil.component';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyALBVTT556hh7Jg1sCdA6eOE4G4zNyBxeA",
  authDomain: "angular-crud-firebase-d60e1.firebaseapp.com",
  databaseURL: "https://angular-crud-firebase-d60e1.firebaseio.com",
  projectId: "angular-crud-firebase-d60e1",
  storageBucket: "angular-crud-firebase-d60e1.appspot.com",
  messagingSenderId: "151666909009"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    NoticiasComponent,
    NoticiaComponent,
    QuienesSomosComponent,
    ContactenosComponent,
    ServiciosComponent,
    CentrosTuristicosComponent,
    CentroTuristicoComponent,
    DashboardComponent,
    LandingPageComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    NgxPaginationModule, 
    FormsModule
  ],
  providers: [
    UsuariosService, 
    DataStorageService, 
    AuthGuard, 
    AuthAdminGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
