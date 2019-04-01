import { DataStorageService } from '../localstorage/data-storage.service';
import { User } from '../interfaces/interface';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private dataStorageService: DataStorageService, private _router: Router) {
  }

  user:User;
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.user = this.dataStorageService.getObjectValue("online")
    if (this.user != null) {
        return true;
    }
    console.log("bloqueado por el guard");
    // navigate to login page
    this._router.navigate(['/landing-page']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;

  }

}
