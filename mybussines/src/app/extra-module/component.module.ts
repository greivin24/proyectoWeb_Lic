import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { LoginComponent } from '../components/login/login.component';
import { NoticiasComponent } from '../components/noticias/noticias.component';
import { NoticiaComponent } from '../components/noticia/noticia.component';
import { QuienesSomosComponent } from '../components/quienes-somos/quienes-somos.component';
import { ContactenosComponent } from '../components/contactenos/contactenos.component';
import { ServiciosComponent } from '../components/servicios/servicios.component';
import { CentrosTuristicosComponent } from '../components/centros-turisticos/centros-turisticos.component';
import { CentroTuristicoComponent } from '../components/centro-turistico/centro-turistico.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { PerfilComponent } from '../components/perfil/perfil.component';


//Router
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
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
    CommonModule, 
    RouterModule,
    AppRoutingModule 
  ], 
  exports:[
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
    PerfilComponent,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
  ],
})
export class ComponentModule { }
