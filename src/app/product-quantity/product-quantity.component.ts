import { Component,Input, OnInit } from '@angular/core';
import { ShopingCartService } from '../services/shoping-cart.service';
import { Product } from '../models/products';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

 
  @Input('product') product:Product;
  @Input('show-actions') showActions =true; // it will override value if redirecting from admin manage product ; shoactions=false means card displaying on product form component
  @Input('shopping-cart') ShoppingCart;
  @Input('index') prodIndexId;
   
  
  constructor(private cartservice:ShopingCartService) { }  

   addToCart(product:Product)  {
    this.cartservice.addToCart(product);   
  }//end of addToCart

  removeFromCart(product:Product){
    this.cartservice.removeFromCart(product)
  }
 
  
   
}
