import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data/data.service';
import { FirebaseService } from '../../services/firebase.service';
import { UserAuth } from '../../interfaces/interface';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user:any;
  constructor(private activatedRouter: ActivatedRoute, private dataService:DataService, private firebaseService:FirebaseService) { 

    this.activatedRouter.params.subscribe( params =>{
      this.firebaseService.getUser(params['id']).subscribe(result=>{
        this.user = result;
      })
    })

  }

  ngOnInit() {

  }

}
