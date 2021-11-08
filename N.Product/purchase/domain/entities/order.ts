import { Entity } from "../../../common/domain/entities/entity";
import { Money } from "../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";
import { Status } from "../../../common/domain/Enum/Status";
import { ProductRegisteredEvents } from "../../messages/events/order-registered.events";


export class Order extends Entity {
  private Price:Money;
  private PurchaseDate:DateTime;
  private Status:Status;
  //TODO: Relations with customer will be place here

  public constructor(id:number,price:Money,purchaseDate:DateTime,status:Status) {
    super(id);
    this.Price=price;
    this.PurchaseDate=purchaseDate;
    this.Status=status;
  }
  public register(){
    const event=new ProductRegisteredEvents(this.id,this.Price,this.PurchaseDate,this.Status);
    this.apply(event);
  }

  public GetPrice():Money{
    return this.Price;
  }
  public GetPurchaseDate():DateTime{
    return this.PurchaseDate;
  }
  public GetStatus():Status{
    return this.Status;
  }

  public changePrice(price:Money):void{
    this.Price=price;
  }
  public changePurchaseDate(purchaseDate:DateTime):void{
    this.PurchaseDate=purchaseDate;
  }
  public changeStatus(status:Status):void{
    this.Status=status;
  }
}