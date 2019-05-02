import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot,
   RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import {map,switchMap} from 'rxjs/operators';
import { UserService } from './services/user.service';
import { AppUser } from './models/app-user';
 
 

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

   userrole:Observable<AppUser>;

  constructor(private auth:AuthService,private router:Router, private userservice:UserService){}

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .pipe(
    map (appUser => appUser.isAdmin)
    );
    }

}
