import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit,OnDestroy {

   
  orders$; 
  orders1:any=[];
  //usersubscription:Subscription;
  //ordersubscription: Subscription;

  constructor( private orderservice:OrderService, private userservice:UserService) { }

  async ngOnInit()
  {     
   this.orders$ =  this.orderservice.getOrders();      
  }
 

  ngOnDestroy(){
    //this.usersubscription.unsubscribe();
   // this.ordersubscription.unsubscribe();
  }


}
