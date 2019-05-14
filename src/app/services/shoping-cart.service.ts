import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/products';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {

  constructor(private db:AngularFireDatabase) {

   }

  private create(){
         
     return this.db.list('/shopping-carts').push({  // thisl will create/ push cart id in shopping-carts collection it returns promise to component
       dateCreated : new Date().getTime()
     });

   }


  private getCart(cartid:string){
    return this.db.object('/shopping-carts/'+cartid);
   }

 /*  private getOrCreateCart(){  

      let cartId = localStorage.getItem('cartId'); 

      if(!cartId){
        this.create().then(result=>{
          localStorage.setItem('cartId',result.key);  //  return this.getCart(result.key);     
          return result.key;
        });    
      }
      else{
       //return this.getCart(cartId);
       return cartId;
      }

   } */

   private async getOrCreateCart(){

    let cartId = localStorage.getItem('cartId'); 
    if(cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
    }
  private getItem(cartid, productid){
    return  this.db.object('/shopping-carts/' + cartid + '/items/' + productid);
  }
   
   /* here async added before function and await added before function call getorcreatecart() because we are not going to use .then  as getorcreatecart returns 
   promise [promise need .then to handle result].
   to write our code more linear we are going to use async and await to make call sync instead to promise[.then]
   
   */ 
  async addToCart(product){
     
   let cartid = await this.getOrCreateCart();
   var collectionObj =this.getItem(cartid, product.key) ;//this.db.object('/shopping-carts/' + cartid + '/items/' + product.key); 
   var items$ = this.getItem(cartid, product.key).valueChanges();
   
    items$.pipe(take(1)).subscribe((item :any)=>{    
      if(!item){
        collectionObj.set({product:product, quantity:1})
      }
      else{              
        collectionObj.update({quantity:item.quantity + 1})
      }
   });
    
  }// end of addtocart

 
  /*  
  FARMAN CODE
  async addToCart(product){
  let cartId = await this.getOrCreateCartId();
    let items$ = this.getItem(cartId, product.key);

    items$.snapshotChanges().pipe(take(1)).subscribe(item => {
      let quant = 0;
      if (item.payload.hasChild('quantity'))
        quant = item.payload.val().quantity;

      quant = (quant || 0) + change;
      if (quant === 0)
        items$.remove();
      else {
        let object = { ...product, quantity: quant };
        items$.update(object);
      }
    });
  } */


} // end of class
