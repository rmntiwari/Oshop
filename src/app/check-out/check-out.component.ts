import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  customer : any = {};

  constructor() { }

  ngOnInit() {
  }
  placeorder(orderinfo){
    
    console.log("placing your order.",orderinfo);
  }

}
