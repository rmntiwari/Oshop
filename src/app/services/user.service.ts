import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import *  as firebase from 'firebase/app';   
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFireDatabase) {

   }
 
  //function for create or update user in database
  saveuserfunc(user:firebase.User)
  {
    this.db.object('/users/' +user.uid).update({
      name:user.displayName,
      email:user.email,
      isAdmin:true,
      isStoreManager:true
    });
  }
 
  get(uid:string):AngularFireObject<AppUser>
  {
    return this.db.object('/users/' + uid);
  } 

}
