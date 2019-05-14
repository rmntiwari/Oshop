import { Component,Input } from '@angular/core';
import { Product } from '../models/products';
import { ShopingCartService } from '../services/shoping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product:Product;
  @Input('show-actions') showActions =true; // it will override value if redirecting from admin manage product ; shoactions=false means card displaying on product form component
  
  constructor(private cartservice:ShopingCartService) { }  

  addToCart(product:Product)
  {
    this.cartservice.addToCart(product);
   
  }//end of addToCart

}// end of class
