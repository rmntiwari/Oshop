 
import { ShoppingCartItem } from './../models/shoppint-cart-items';
import { Subscription } from 'rxjs';
import { ShopingCartService } from './../services/shoping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
 

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
   
  shippingaddress: any = {};
  userId;
  //cart:ShoppingCart;
  cart:any;
  cartsubscription:Subscription;
  usersubscription:Subscription;
  temp:any=[];
  constructor(
     private authservice:AuthService,
     private orderservice:OrderService,
     private shoppingCartService:ShopingCartService
    
    ) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartsubscription = cart$.subscribe(cart=>{
       this.cart = cart;
     })
    this.usersubscription = this.authservice.user$.subscribe(usr=> this.userId = usr.uid)

     
  }
  ngOnDestroy(){
    this.cartsubscription.unsubscribe();
    this.usersubscription.unsubscribe();
  }

  placeOrder(formdata){
    
     let order = {
      userId:this.userId,
      datePlaced :new Date().getTime(),
      shippingAddress: this.shippingaddress,
      items:this.cart.items.map(i=>{
        console.log(i.totalprice);
          
        return {
              product:{
                Image:i.product.Image,
                title:i.product.title,
                price:i.product.price
            },
            quantity:i.quantity ,
           // totalprice:i.grandTotal
        } 
      })
    
    };
    
    this.orderservice.placeOrder(order);
  }

}
