import { ShoppingCartItem } from './shoppint-cart-items';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap) {
        this.itemsMap = itemsMap || {};

         if (itemsMap) {
            for (let productId in itemsMap.items) {
                if (itemsMap.items.hasOwnProperty(productId)) {
                    let item = itemsMap.items[productId];
                    this.items.push(new ShoppingCartItem({ ...item, key: productId }));
                }
            }
        } 
    }

    getQuantity(product) {
        if (this.itemsMap.items) {
            let item = this.itemsMap.items[product.key];
            return item ? item.quantity : 0;
        }
        return 0;

    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap.items)
            count += this.itemsMap.items[productId].quantity;
        return count;
    }

    get grandTotal() {
       // return 10;
        let sum = 0;

        for (let productId in this.itemsMap.items)
            { var pid =  productId;        
            sum += (this.itemsMap.items[pid].quantity * this.itemsMap.items[pid].product.price);
            }
        return sum;
    }
}