import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
 

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  id;
  categories$;
  product: any = {};


  constructor(categoryservice: CategoryService, private productservice: ProductService, private route: ActivatedRoute, private router: Router) {
    this.categories$ = categoryservice.getCategories();     
    this.id = this.route.snapshot.paramMap.get('id');//getting single product 
    if (this.id) {
      this.productservice.getproductbyid(this.id).subscribe(actions => {
        const key = actions.key;
        const data = actions.payload.val();
        this.product = { key, ...data }
      });
    }

  }

  // for save or update product in db
  saveproduct(product) {

    if (this.id) {
      this.productservice.updateproduct(this.id, product);
    }
    else {
      this.productservice.create(product);
    }

    this.router.navigate(['/admin/products']);

  }

  deleteproduct() {
    if (confirm('Are you sure to delete this product')) {
      this.productservice.deleteproduct(this.id);
      this.router.navigate(['/admin/products']);
    } else {
      return;
    }
  }

  ngOnInit() {
  }

}
