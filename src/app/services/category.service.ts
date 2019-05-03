import { Injectable } from '@angular/core';
import { FirebaseDatabase } from '@angular/fire';
import { AngularFireList, AngularFireDatabase} from '@angular/fire/database';
 

@Injectable({
  providedIn: 'root'
})
export class CategoryService {   

  constructor(private db:AngularFireDatabase) {

   }

   getCategories(){
      return this.db.list('categories/');
      //return this.db.list('categories/').valueChanges();
   }
}
