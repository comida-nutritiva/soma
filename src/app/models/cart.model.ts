import { Optional } from "./optional.model";
import { Product } from "./product.model";

export class CartItem{

    private static lastId=0;
    public id : number;

    constructor(
        public product : Product,
        public optionals: Optional[]
    ){
        CartItem.lastId++;
        this.id = CartItem.lastId;
    }
    
    getTotalValue(): number{
        return this.optionals.reduce((total, p) => total + p.price, 0) + this.product.price;
    }
}

export class Cart{

    public cartItem : CartItem[];

    constructor(c : CartItem[]){
        this.cartItem = c;
    }

    getTotalValue():number{
        return this.cartItem.reduce((total, p) => total + p.getTotalValue(), 0)
    }

    removeItemByItemId(id:number){
        this.cartItem.splice(this.cartItem.findIndex(p => p.id === id),1);
    }

    addItem(p:Product, o:Optional[]){
        const item = new CartItem(p, o);
        this.cartItem.push(item);
    }

    getCart(): CartItem[]{
        return this.cartItem;
    }

}