import { Entity } from "../../../../common/domain/entities/entity";
import { ProductRegisteredEvent } from "../../messages/events/product-registered.event";

export class Product extends Entity{
  private name:string;
  protected type:string;
  private price:number;
  private stock:number;

  constructor(id:number,name:string,type:string,price:number,stock:number) {
    super(id);
    this.name=name;
    this.type=type;
    this.price=price;
    this.stock=stock;
  }

  public register(){
    const event=new ProductRegisteredEvent(this.id,this.name,this.type,this.price,this.stock);
    this.apply(event);
  }

  public getName(){
    return this.name;
  }

  public getType(){
    return this.type;
  }

  public getPrice(){
    return this.price;
  }

  public getStock(){
    return this.stock;
  }

  public setName(name: string){
    this.name=name;
  }

  public setType(type: string){
    this.type=type;
  }

  public setPrice(price: number){
    this.price=price;
  }

  public setStock(stock:number){
    this.stock=stock;
  }

}
