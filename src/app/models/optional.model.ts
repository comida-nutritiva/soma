export class Optional{
    id:number
    name:string
    price:number
    max:number
    count:number

    constructor(id:number, name:string, price:number, max:number, count:number){
        this.id=id;
        this.name=name;
        this.price=price;
        this.max=max;
        this.count=count;
    }
}