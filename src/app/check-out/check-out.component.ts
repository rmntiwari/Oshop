 
import { ShoppingCartItem } from './../models/shoppint-cart-items';
import { Subscription } from 'rxjs';
import { ShopingCartService } from './../services/shoping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
 

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
  grandtotal ;


  constructor(
    private router:Router,
     private authservice:AuthService,
     private orderservice:OrderService,
     private shoppingCartService:ShopingCartService,  
    
    ) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartsubscription = cart$.subscribe(cart=>{      
       this.cart = cart;
       this.grandtotal = cart.grandTotal;
     })
    this.usersubscription = this.authservice.user$.subscribe(usr=> this.userId = usr.uid)    
  }


  ngOnDestroy(){
    this.cartsubscription.unsubscribe();
    this.usersubscription.unsubscribe();
  }

 async placeOrder(formdata){  
     let order = {
      userId:this.userId,
      datePlaced :new Date().getTime(),
      shippingAddress: this.shippingaddress,  
      grandtotal:this.grandtotal,     
      items:this.cart.items.map(i=>{      
          
        return {
              product:{
                Image:i.product.Image,
                title:i.product.title,
                price:i.product.price
            },
            quantity:i.quantity           
        } 
      })
    
    };  
    let result = await this.orderservice.placeOrder(order);     
    // this.shoppingCartService.clearCartitems();      // move this code where you saving order because you will always have to call this line whenever you placing order so it is better to use this code wher you are saving order
    this.router.navigate(['order-success/', result.key]);
  }

}
