import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories:any;
 
  @Input('category')category ; // input decorator take value passed by parent class productComponent as current 
  //paremeter of page and apply active class on it using template of this class.

  constructor( private categoryservice : CategoryService) { 


    
   //gettig all categories
   this.categoryservice.getAll().subscribe(cat=>{
    this.categories = cat;
    
  });



  }//constructor end


  ngOnInit() {
  }

}
