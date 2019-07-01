import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase) { }

  placeOrder(orderinfo){
   // console.log(orderinfo);
   return this.db.list('/orders').push(orderinfo);
  }
}
