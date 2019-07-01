import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
  
import { ShopingCartService } from './shoping-cart.service';
 
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor(private db:AngularFireDatabase, private ShopingCartService: ShopingCartService ) { }


   async placeOrder(orderinfo){   
   let order = await this.db.list('/orders').push(orderinfo);
   this.ShopingCartService.clearCartitems();
   return order;
  }
  
}
