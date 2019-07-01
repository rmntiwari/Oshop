import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

   
  orders$; 
  constructor( private orderservice:OrderService) { }

  async ngOnInit() {    
    this.orders$ =  this.orderservice.getOrders();
  }



}
