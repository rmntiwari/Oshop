import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable, pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {

  cartItemArray = [];
  shoppingCartObject: any;

  constructor(private db: AngularFireDatabase) {

  }

  private create() {

    return this.db.list('/shopping-carts').push({  // thisl will create/ push cart id in shopping-carts collection it returns promise to component
      dateCreated: new Date().getTime()
    });

  }

  async getCart1(): Promise<AngularFireObject<ShoppingCart>> {
    let cartid = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/' + cartid);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {

    let cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(map(x => {
      return new ShoppingCart(x.payload.val());
    }));

  }


  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartid, productid) {
    return this.db.object('/shopping-carts/' + cartid + '/items/' + productid);
  }

  /* here async added before function and await added before function call getorcreatecart() because we are not going to use .then  as getorcreatecart returns 
  promise [promise need .then to handle result]. to write our code more linear we are going to use async and await to make call sync instead to promise[.then]   
  */
  async addToCart(product) {

    let cartid = await this.getOrCreateCart();
    var collectionObj = this.getItem(cartid, product.key);
    var items$ = this.getItem(cartid, product.key).valueChanges();
    let q = 0;
    items$.pipe(take(1)).subscribe((item: any) => {

      if (!item) {
        collectionObj.update({ product: product, quantity: 1 });
      }
      else {
        collectionObj.update({ quantity: item.quantity + 1 });
      }
    });

  }// end of addtocart


  async removeFromCart(product) {

    let cartid = await this.getOrCreateCart();

    var collectionObj = this.getItem(cartid, product.key);

    var items$ = this.getItem(cartid, product.key).valueChanges();
    let q = 0;
    items$.pipe(take(1)).subscribe((item: any) => {
      if (!item) {
        collectionObj.update({ product: product, quantity: 0 });
      }
      else {
        collectionObj.update({ quantity: item.quantity - 1 });
      }
    });

  }// end of addtocart



  getItems() {
    return this.db.object('/shopping-cart/' + this.getOrCreateCart);
  }



} // end of class
