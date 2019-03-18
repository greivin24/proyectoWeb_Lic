import { Component, OnInit } from '@angular/core';
import { NavbarOpc } from '../../interfaces/interface';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
 //Navbar opcions
  navbarOpcs:NavbarOpc[]=[
  { nombre: "Noticias", router_link: "noticias" },
  { nombre: "Quienes Somos", router_link: "quienes-somos" },
  { nombre: "Contactenos", router_link: "contactenos" },
  { nombre: "Servicios", router_link: "Servicios" },
  { nombre: "Centros Turisticos", router_link: "centros-turisticos" }
];

  checkisIn: boolean= true;
  constructor() { }

  ngOnInit() {
  }

}
