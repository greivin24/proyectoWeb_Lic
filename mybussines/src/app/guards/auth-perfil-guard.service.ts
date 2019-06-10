import { DataStorageService } from '../localstorage/data-storage.service';
import { UserAuth } from '../interfaces/interface';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthPerfilGuardService implements CanActivate {


  constructor(private dataStorageService: DataStorageService, private _router: Router) {
  }

  user:UserAuth;
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.user = this.dataStorageService.getObjectValue("online");
    if (this.user.rol != next.data.role) {
      return true;
    }
    this._router.navigate(['/inicio/noticias']);
    return false;

  }

}
