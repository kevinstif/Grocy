import { Entity } from "../../../../common/domain/entities/entity";
import { OrderRegisteredEvents } from "../../messages/events/order-registered.events";
import { Money } from "../../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";
import { Status } from "../../../../common/domain/Enum/Status";

export class Order extends Entity {
  private Price:Money;
  private PurchaseDate:DateTime;
  private Status:Status;

  public constructor(id:number,price:Money,purchaseDate:DateTime,status:Status) {
    super(id);
    this.Price=price;
    this.PurchaseDate=purchaseDate;
    this.Status=status;
  }
  public register(){
    const event=new OrderRegisteredEvents(
      this.id,
      this.Price.getAmount(),
      this.PurchaseDate.getDate().toString(),
      this.Status
    );
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
