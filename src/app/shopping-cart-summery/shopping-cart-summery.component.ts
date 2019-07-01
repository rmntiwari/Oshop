import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartItem } from '../models/shoppint-cart-items';
import { Subscription } from 'rxjs';
import { ShopingCartService } from '../services/shoping-cart.service';

@Component({
  selector: 'shopping-cart-summery',
  templateUrl: './shopping-cart-summery.component.html',
  styleUrls: ['./shopping-cart-summery.component.css']
})
export class ShoppingCartSummeryComponent implements OnInit,OnDestroy{

  //@Input('shopping-cart') cart :any;
  cartsubscription:Subscription;
  totalitemcount:number;
  cart;
  items;
  grandtotal;
 
  constructor(private shoppingcartservice:ShopingCartService){
     
  }

  async ngOnInit() {
    let cart$ = await this.shoppingcartservice.getCart();
    this.cartsubscription = cart$.subscribe(cart=>{
         
        this.totalitemcount= cart.totalItemsCount;
        this.grandtotal = cart.grandTotal;
        this.cart = cart;
        this.items =this.cart.items.map(i=>{
          let totalprice = i.product.price * i.quantity;       
          return{
            product:{
              Image:i.product.Image,
              title:i.product.title,
              price:i.product.price,
              quantity:i.quantity,
              totalprice:totalprice,  
             }
          }
        });
    })
  }
  ngOnDestroy(){
    this. cartsubscription.unsubscribe();    
  }
  
}
