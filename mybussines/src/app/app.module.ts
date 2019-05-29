import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// npm imports
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EmbedVideo } from 'ngx-embed-video';

//Components
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
import { PerfilComponent } from './components/perfil/perfil.component';

//Servicios
import { FirebaseService } from './services/firebase.service';
import { ImagenesService } from './services/imagenes.service';


//Local Storage
import { DataStorageService } from './localstorage/data-storage.service';

//Auth Guard
import { AuthGuard } from './guards/auth-guard.service';
import { AuthAdminGuardService } from './guards/auth-admin-guard.service';
import { AuthPerfilGuardService } from './guards/auth-perfil-guard.service';


// Firebase
import { FirebaseModule } from './extra-module/firebase.module';


//DataService Local
import { DataService } from './services/data/data.service';
import { KeysPipe } from './pipes/keys.pipe';

import { BtnctaContactenosComponent } from './components/btncta-contactenos/btncta-contactenos.component';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CommentTreeComponent } from './components/comment-tree/comment-tree.component';


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
    PerfilComponent,
    KeysPipe,
    BtnctaContactenosComponent,
    NgDropFilesDirective,
    CommentTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    NgxPaginationModule,
    NgbModule, 
    FormsModule, 
    CarouselModule,
    FirebaseModule,
    EmbedVideo,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
     
  ],
  providers: [
    FirebaseService,
    ImagenesService, 
    DataStorageService,
    DataService, 
    AuthGuard, 
    AuthAdminGuardService, 
    AuthPerfilGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
