import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
//import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  temp:any;
  allproducts:Product[] =[];
  filteredProduct:Product[] =[];
  categories:any;
  category:string; // parameter category value

  constructor(
    private products:ProductService, 
   // private categoryservice : CategoryService, // MTO->PRODUCT-FILTER COMPONENT 
    private route:ActivatedRoute
    ){   

  
  /*
    this.products.getAll().subscribe(prod=>{     
    prod.forEach(p =>{
      const key = p.key;
      const data = p.payload.val();
      this.temp ={ key, ...data } 
      this.allproducts.push(this.temp);    
     });  
      
    getting query params if availabel on category click and apply a class action on that. we can not use snapshot (route.shnapshot.queryparamMap) here because in this implementation
    this product component is here in the dom but route parameter is changing ang is not going to destroy this component and reinitialize it again. its going to keep 
    this component in the dome and only change the route parameter
    

    this.route.queryParamMap.subscribe(params=>{
      this.category = params.get('category');
      console.log(  this.category);
      console.log( this.allproducts);
      this.filteredProduct=(this.category)?this.allproducts.filter(p=>p.category === this.category): this.allproducts;

    });
  });*/

  /*In the above code there is nested subscribe call one for getting all products and another is in filtering  accordign to query parameters.... this is bad habbit to call
  nested observable .. so we can use switch map instead of nested subscribe of observable......as below
  first add switchmap operator or rxjs. switchmap change one observable to another observable.
  */
 this.products.getAll().pipe(switchMap(prod =>{

     prod.forEach(p =>{
    const key = p.key;
    const data = p.payload.val();
    this.temp ={ key, ...data } 
    this.allproducts.push(this.temp);    
   });    
  return route.queryParamMap;
 })
 ).subscribe(params=>{
   this.category = params.get('category');
  this.filteredProduct=(this.category)?this.allproducts.filter(p=>p.category === this.category): this.allproducts;

 });









   //gettig all categories
/*    this.categoryservice.getAll().subscribe(cat=>{ // MTO->PRODUCT-FILTER COMPONENT 
     this.categories = cat;
     
   });
 */
   

  }

  ngOnInit() {

    
  }

}
