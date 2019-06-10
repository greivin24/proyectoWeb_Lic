import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { CentrosTuristicosComponent } from './components/centros-turisticos/centros-turisticos.component';
import { CentroTuristicoComponent } from './components/centro-turistico/centro-turistico.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';

// Guards
import { AuthGuard } from './guards/auth-guard.service';
import { AuthPerfilGuardService } from './guards/auth-perfil-guard.service';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'inicio', component: HomeComponent, canActivate: [AuthGuard], children: [

        { path: '',redirectTo: "noticias", pathMatch: 'full'},
        { path: 'noticias', component: NoticiasComponent },
        { path: 'noticia/:id', component: NoticiaComponent },
        { path: 'quienes-somos', component: QuienesSomosComponent },
        { path: 'contactenos', component: ContactenosComponent },
        { path: 'servicios', component: ServiciosComponent },
        { path: 'centros-turisticos', component: CentrosTuristicosComponent },
        { path: 'centro-turistico/:id', component: CentroTuristicoComponent },

        { path: 'perfil/:id', component:  PerfilComponent, canActivate: [AuthPerfilGuardService], data: {role: 'Anonimo'}  }, 
        { path: 'panel-control/:id', component: DashboardComponent, canActivate: [AuthPerfilGuardService], data: {role: 'Anonimo'}},
        { path: '**',redirectTo: "noticias", pathMatch: 'full'},
        
  ]},
  { path: '**',redirectTo: "inicio/noticias"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
