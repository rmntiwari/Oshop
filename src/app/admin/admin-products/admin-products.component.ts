import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';
 

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  productlist$ ;


  constructor(private productservice:ProductService) {
   
    this.productlist$ =  this.productservice.getAll();  
    console.log(this.productlist$);
     
   }

  ngOnInit() {
   
  }

  

}
