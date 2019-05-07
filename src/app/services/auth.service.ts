import { Injectable } from '@angular/core'; 
import {AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
 
import {switchMap} from 'rxjs/operators';
import { filter} from 'rxjs/operators';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$:Observable<firebase.User>;

  constructor(
    private afauth:AngularFireAuth, 
    private activatedroute:ActivatedRoute,
    private userService:UserService
    ){ 
      
    this.user$ = afauth.authState;    
  }

  login()
  {
    let returnUrl =  this.activatedroute.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afauth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afauth.auth.signOut();
  }

  isLoggedIn(){
    return this.user$;
  }

  //getter
  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user =>  {
          if (user)
            return this.userService.get(user.uid).valueChanges();
          else
            return of(null);
        }
      )
    );
  }


}
