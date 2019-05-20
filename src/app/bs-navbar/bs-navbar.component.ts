import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { ShopingCartService } from '../services/shoping-cart.service';
 
 

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  implements OnInit {

  
  appUser:AppUser;
  shoppintCartItemCount:number;
  temp:any = [];   
  mycartitems = [];

  constructor(private auth:AuthService, private cartservice : ShopingCartService) {      

  } 

  async ngOnInit()  {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
     
    /* 
    let xyz = await this.cartservice.getCart1();
      let cart$ =xyz.valueChanges();    
      cart$.subscribe(cart =>{
      this.shoppintCartItemCount =0;    
      //console.log(Object.keys(cart[1]));
      //console.log(Object.values(cart[1]));     
      Object.values(cart[1]).forEach(v =>{
      console.log(v.quantity);
      this.shoppintCartItemCount += v.quantity;
      })
    })  
    */   
    
   /*  let abc = await this.cartservice.getCart();
    let cart$ =abc.valueChanges();    
    cart$.subscribe(cart=>{
      this.shoppintCartItemCount =0; 
       Object.values(cart.items).forEach(item =>{          
          this.shoppintCartItemCount += item.quantity;
       }) ;
    }) */

    let abc = await this.cartservice.getCart();
    let cart$ =abc.valueChanges();    
    cart$.subscribe(cart=>{
      
      this.shoppintCartItemCount = 0;
      for(let pid in cart.items  ){           
       this.shoppintCartItemCount +=cart.items[pid].quantity;
      }
    })
     

  }

  logout(){       
       this.auth.logout();
  }

}
