import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { ShopingCartService } from './shoping-cart.service';
 
=======
>>>>>>> 32e8694d3bd304f15e29593fad6d0585df51fc5b

@Injectable({
  providedIn: 'root'
})
export class OrderService {

<<<<<<< HEAD
  constructor(private db:AngularFireDatabase, private ShopingCartService: ShopingCartService ) { }


   async placeOrder(orderinfo){   
   let order = await this.db.list('/orders').push(orderinfo);
   this.ShopingCartService.clearCartitems();
   return order;
  }


=======
  constructor(private db:AngularFireDatabase) { }

  placeOrder(orderinfo){
   // console.log(orderinfo);
   return this.db.list('/orders').push(orderinfo);
  }
>>>>>>> 32e8694d3bd304f15e29593fad6d0585df51fc5b
}
