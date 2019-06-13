import { Component, OnInit } from '@angular/core';
import { ShopingCartService } from '../services/shoping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartitemcount:number;
  cart$:Observable<ShoppingCart>;
  grandTotal:number;

  constructor(private shoppingCartService : ShopingCartService) {
    
   }

 async ngOnInit() {
  
  this.shoppingCartService.getCart().then(x=>{ 
    this.cart$ = x;
    x.subscribe(count=>{            
      if(count.items){
        this.cartitemcount = count.totalItemsCount;         
      }
    })
    console.log("From shopping cart component", this.cart$);
   }) ;  
  }

  removefromcart(){
    alert('item removed');
  }
  
<<<<<<< HEAD
  clearCart(){
    this.shoppingCartService.clearCart();
  }
=======
>>>>>>> a9ab5e5e77924ae11a880cddc948ba9f3d76e4bd
  


}
