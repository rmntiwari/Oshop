import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';
import { of, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) {   

   }

  create(productinfo){
   return this.db.list('/products').push(productinfo);     
  }

  getAllProducts(){
    return this.db.list('/products').valueChanges();
  }

 /*  getAll() {
    return this.db.list('/products').snapshotChanges()
      .subscribe(actions => {
            actions.forEach(action => {
            const key = action.key;
            const data = action.payload.val();
            return { key, ...data };
            });
      });
  } */

  getAll(): Observable<any> {
    return this.db.list<any>('/products')
        .snapshotChanges()
        .pipe(
            map(changes =>
                changes.map(c => {
                    const data = c.payload.val() as Product;
                    const id = c.payload.key;
                    return { id, ...data };
                })
            )
        );
}



}
