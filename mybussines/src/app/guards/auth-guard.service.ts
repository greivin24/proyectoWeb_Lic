import { DataStorageService } from '../localstorage/data-storage.service';
import { UserAuth } from '../interfaces/interface';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private dataStorageService: DataStorageService, private _router: Router) {
  }

  user:AuthService;
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.user = this.dataStorageService.getObjectValue("online")
    if (this.user != null) {
        return true;
    }
    this._router.navigate(['/landing-page']);
    return false;

  }

}
