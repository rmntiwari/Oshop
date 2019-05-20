import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ShopingCartService } from '../services/shoping-cart.service';
import { ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  temp:any;
  allproducts:Product[] =[];
  filteredProduct:Product[] =[];
  categories:any;
  category:string; // parameter category value
  subscription:Subscription;
  cart:any ;
  carttemp:any;

  constructor(private products:ProductService, private route:ActivatedRoute, private cartservice:ShopingCartService )
  {        
    this.products.getAll().pipe(switchMap(prod => {
      prod.forEach(p => {
        const key = p.key;
        const data = p.payload.val();
        this.temp = { key, ...data }
        this.allproducts.push(this.temp);
      });
      return route.queryParamMap;
    })
    ).subscribe(params => {
      this.category = params.get('category');
      this.filteredProduct = (this.category) ? this.allproducts.filter(p => p.category === this.category) : this.allproducts;
      
    }); 
        
  }// end constructor
   
  async ngOnInit() {
    await this.cartservice.getCart();
    this.subscription = (await this.cartservice.getCart()).valueChanges()
      .subscribe(y => {        
        this.cart = y;
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}//end class
