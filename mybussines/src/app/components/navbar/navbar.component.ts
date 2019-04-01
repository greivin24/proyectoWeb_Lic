import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../localstorage/data-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dataStorageService:DataStorageService, private router:Router) { }

  ngOnInit() {
  }

  btnSalir(){
    this.dataStorageService.deleteObjectValue("online");
    this.router.navigate(['/landing-page']);
  }

}
