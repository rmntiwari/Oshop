import { Component,Input } from '@angular/core';
import { Product } from '../models/products';
import { ShopingCartService } from '../services/shoping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
 

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product:Product;
  @Input('show-actions') showActions =true; // it will override value if redirecting from admin manage product ; shoactions=false means card displaying on product form component
  @Input('shopping-cart') ShoppingCart;
  @Input('index') prodIndexId;
 
  
  constructor(private cartservice:ShopingCartService) { 
     console.log(this.prodIndexId);
  }    
 /*  addToCart(product:Product)  {
    this.cartservice.addToCart(product);   
  }//end of addToCart

  removeFromCart(product:Product){
    this.cartservice.removeFromCart(product)
  }

  getQuantity(){    
    return 0;
  } */

}// end of class
