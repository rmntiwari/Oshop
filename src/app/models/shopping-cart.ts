import { shoppingCartItem } from './shoppint-cart-items';

export class shoppingCart{
   
    //items:shoppingCartItem[];
    constructor(public items:shoppingCartItem[]){
        
    }

    get totalItemCount(){
        let count = 0 ;
       for(let pid in this.items){
           count += this.items[pid].quantity;
       }
       return count;
    }


}