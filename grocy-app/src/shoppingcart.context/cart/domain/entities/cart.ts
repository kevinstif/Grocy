import { Entity } from "../../../../common/domain/entities/entity";
import { CartRegisteredEvents } from "../../messages/events/cart-registered.events";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";

export class Cart extends Entity {
  private CustomerId:number;
  private Quantity:number;
  private CreationDate:DateTime;
  private State:string;

  public constructor(id:number,customerId:number,quantity:number,creationDate:DateTime,state:string) {
    super(id);
    this.CustomerId = customerId;
    this.Quantity = quantity;
    this.CreationDate = creationDate;
    this.State = state;
  }
  public register(){
    const event=new CartRegisteredEvents(this.id, this.CustomerId, this.Quantity, this.CreationDate, this.State);
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
  public GetState():string{
    return this.State;
  }
}
