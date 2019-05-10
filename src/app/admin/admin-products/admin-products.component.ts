import { Component,OnDestroy,OnInit } from '@angular/core'; 
import { Subscription, Subscribable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/products';
import {DataTableResource} from 'angular5-data-table';
 
 

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
 
 private prod;
 products:Product[]=[];   
 tableresource =  new DataTableResource(this.products);
 items:Product[]=[];
 itemCount:number;
 subscription:Subscription;

  constructor(private productService:ProductService) { 
     //getting all products 
     this.subscription= this.productService.getAll().subscribe(actions => {       
      actions.forEach(action => {
      const key = action.key;
      const data = action.payload.val();
      this.prod = { key, ...data };
      this.products.push(this.prod);      
      
      });       
      
      this.initializeTable(this.products); // initializing  data table [custome private function]
      
    });
   
  } 

  ngOnInit(){
   
  }
  
  
  private initializeTable(Products:Product[]){   
    
      this.tableresource = new DataTableResource(Products);
      this.tableresource.query({offset:0}).then(items=>{
        this.items = items;
      });
      this.tableresource.count().then(count=>{this.itemCount = count});
  }

  relaodItems(params){

    if(!this.tableresource) return false; 

    this.tableresource.query(params).then(items=>{
      this.items = items;
    });
  }
  

  //filter : search box 
  searchproduct(query:string){ 

    let filtered_product= query? this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):this.products;     
    this.initializeTable(filtered_product);
  } 
   
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  } 

}
