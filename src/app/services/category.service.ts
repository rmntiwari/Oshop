import { Injectable } from '@angular/core';
import { FirebaseDatabase } from '@angular/fire';
import { AngularFireList, AngularFireDatabase} from '@angular/fire/database';
import { query } from '@angular/core/src/render3';
 

@Injectable({
  providedIn: 'root'
})
export class CategoryService {   

  constructor(private db:AngularFireDatabase) {

   }

   getAll(){       
      return this.db.list('categories/').valueChanges();
   }
   
}
