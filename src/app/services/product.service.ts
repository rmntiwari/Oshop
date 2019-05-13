import { Injectable } from '@angular/core'; 
import { AngularFireDatabase } from '@angular/fire/database';
 


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) {  
  }

  create(productinfo){
   return this.db.list('/products').push(productinfo);     
  }

   getAll() {
    return this.db.list('/products').snapshotChanges();    
  } 

  getproductbyid(productid){    
   //both option will work [snapshotChanges is used when you need key of document too with all data ]
    return this.db.object('/products/'+ productid).snapshotChanges();
    //return this.db.object('/products/'+ productid).valueChanges();   
  }

  updateproduct(id, product){ // hrere product object should not have id coz produt id is unique and it will not update . it can cause runtime error dring update'
   return this.db.object('/products/'+id).update(product);
  }

  deleteproduct(id){
    return this.db.object('/products/'+id).remove();
  }

}
