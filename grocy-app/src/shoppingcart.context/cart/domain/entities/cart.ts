import { Entity } from "../../../../common/domain/entities/entity";
import { CartRegisteredEvents } from "../../messages/events/cart-registered.events";

export class Cart extends Entity {
  private CustomerId:number;
  private ProductId:number;
  private Quantity:number;
  private CreationDate:string;
  private State:string;

  public constructor(id:number,customerId:number,productId:number,quantity:number,creationDate:string,state:string) {
    super(id);
    this.CustomerId = customerId;
    this.ProductId = productId;
    this.Quantity = quantity;
    this.CreationDate = creationDate;
    this.State = state;
  }
  public register(){
    const event=new CartRegisteredEvents(this.id, this.CustomerId, this.ProductId, this.Quantity, this.CreationDate, this.State);
    this.apply(event);
  }

  public GetCustomerId():number{
    return this.CustomerId;
  }
  public GetQuantity():number{
    return this.Quantity;
  }
  public GetCreationDate():string{
    return this.CreationDate;
  }
  public GetState():string{
    return this.State;
  }
}
