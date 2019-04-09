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

//Servicios
import { UsuariosService } from './services/usuarios.service';
import { BtnctaContactenosComponent } from './components/btncta-contactenos/btncta-contactenos.component';


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
    BtnctaContactenosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    NgxPaginationModule, 
    FormsModule
  ],
  providers: [
    UsuariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
