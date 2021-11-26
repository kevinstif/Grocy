import { Entity } from "../../../../common/domain/entities/entity";
import { CartRegisteredEvents } from "../../messages/events/cart-registered.events";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";
import { Money } from "../../../../common/domain/value-objects/money.value";

export class Cart extends Entity {
  private CustomerId:number;
  private Quantity:number;
  private CreationDate:DateTime;
  private price:Money;
  private State:string;

  public constructor(id:number,customerId:number,quantity:number,creationDate:DateTime,price:Money,state:string) {
    super(id);
    this.CustomerId = customerId;
    this.Quantity = quantity;
    this.CreationDate = creationDate;
    this.price=price;
    this.State = state;
  }
  public register(){
    const event=new CartRegisteredEvents(this.id, this.CustomerId, this.Quantity, this.CreationDate,this.price, this.State);
    this.apply(event);
  }

  public GetCustomerId():number{
    return this.CustomerId;
  }
  public GetQuantity():number{
    return this.Quantity;
  }
  public GetCreationDate():DateTime{
    return this.CreationDate;
  }
  public GetPrice():Money{
    return this.price;
  }
  public GetState():string{
    return this.State;
  }
}
