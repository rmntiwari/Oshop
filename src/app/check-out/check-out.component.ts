 
import { ShoppingCartItem } from './../models/shoppint-cart-items';
import { Subscription } from 'rxjs';
import { ShopingCartService } from './../services/shoping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> 32e8694d3bd304f15e29593fad6d0585df51fc5b
 

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
   
  shippingaddress: any = {};
  userId;
<<<<<<< HEAD
  cart1:ShoppingCart;
  cart:any;
  cartsubscription:Subscription;
  usersubscription:Subscription;   
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

=======
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
>>>>>>> 32e8694d3bd304f15e29593fad6d0585df51fc5b
  ngOnDestroy(){
    this.cartsubscription.unsubscribe();
    this.usersubscription.unsubscribe();
  }

<<<<<<< HEAD
 async placeOrder(formdata){  
     let order = {
      userId:this.userId,
      datePlaced :new Date().getTime(),
      shippingAddress: this.shippingaddress,  
      grandtotal:this.grandtotal,     
      items:this.cart.items.map(i=>{      
=======
  placeOrder(formdata){
    
     let order = {
      userId:this.userId,
      datePlaced :new Date().getTime(),
      shippingAddress: this.shippingaddress,
      items:this.cart.items.map(i=>{
        console.log(i.totalprice);
>>>>>>> 32e8694d3bd304f15e29593fad6d0585df51fc5b
          
        return {
              product:{
                Image:i.product.Image,
                title:i.product.title,
                price:i.product.price
            },
<<<<<<< HEAD
            quantity:i.quantity           
        } 
      })
    
    };  
    let result = await this.orderservice.placeOrder(order);     
    // this.shoppingCartService.clearCartitems();      // move this code where you saving order because you will always have to call this line whenever you placing order so it is better to use this code wher you are saving order
    this.router.navigate(['order-success/', result.key]);
=======
            quantity:i.quantity ,
           // totalprice:i.grandTotal
        } 
      })
    
    };
    
    this.orderservice.placeOrder(order);
>>>>>>> 32e8694d3bd304f15e29593fad6d0585df51fc5b
  }

}
