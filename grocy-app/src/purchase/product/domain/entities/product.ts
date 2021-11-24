import { Entity } from "../../../../common/domain/entities/entity";
import { ProductRegisteredEvent } from "../../messages/events/product-registered.event";
import { TypeProduct } from "../enums/type-product";
import { Money } from "../../../../common/domain/value-objects/money.value";

export class Product extends Entity{
  private name:string;
  protected type:TypeProduct;
  private price:Money;
  private stock:number;

  constructor(id:number,name:string,type:TypeProduct,price:Money,stock:number) {
    super(id);
    this.name=name;
    this.type=type;
    this.price=price;
    this.stock=stock;
  }

  public register(){
    const event=new ProductRegisteredEvent(this.id,this.name,this.type,this.price.getAmount(),this.stock);
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

  public setType(type: TypeProduct){
    this.type=type;
  }

  public setPrice(price: Money){
    this.price=price;
  }

  public setStock(stock:number){
    this.stock=stock;
  }

}
