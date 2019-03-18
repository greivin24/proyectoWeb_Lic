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

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'noticias', component: NoticiasComponent},
  { path: 'noticia/:id', component: NoticiaComponent},
  { path: 'quienes-somos', component: QuienesSomosComponent},
  { path: 'contactenos', component: ContactenosComponent},
  { path: 'servicios', component: ServiciosComponent},
  { path: 'centros-turisticos', component: CentrosTuristicosComponent},
  { path: 'centro-turistico/:id', component: CentroTuristicoComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
