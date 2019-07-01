import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { ShopingCartService } from '../services/shoping-cart.service';
import { Observable } from 'rxjs'
import { ShoppingCart } from '../models/shopping-cart';
 
 

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  implements OnInit {   

  appUser: AppUser;
  shoppingCartItemCount: number;  
  collapsed = true;
  constructor(private auth:AuthService, private ShopingCartService : ShopingCartService) {      

  } 

  async ngOnInit()  {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);   

    this.ShopingCartService.getCart().then(x => {
    x.subscribe(count => {
      
    this.shoppingCartItemCount = 0;
    if (count.items)        
      this.shoppingCartItemCount = count.totalItemsCount;
       
    });
    });


  }

  logout(){       
       this.auth.logout();
  }
  toggleCollapsed(){
    this.collapsed = !this.collapsed;
    console.log(this.collapsed);
  }

}
