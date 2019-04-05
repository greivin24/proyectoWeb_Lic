import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../localstorage/data-storage.service';
import { Router } from '@angular/router';


//
import { AuthService } from '../../services/auth.service';
import { UserAuth } from '../../interfaces/interface';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeUser:UserAuth;
  constructor(private dataStorageService:DataStorageService, private router:Router, private authService:AuthService) { }

  ngOnInit() {
    this.activeUser = this.dataStorageService.getObjectValue("online");
  }

  btnSalir(){
    this.dataStorageService.deleteObjectValue("online");
    this.logoutAuht();
    this.router.navigate(['/landing-page']);
  }

  logoutAuht(){
    this.authService.signOut();
  }



}
