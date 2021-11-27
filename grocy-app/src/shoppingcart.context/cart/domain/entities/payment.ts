import { Money } from "../../../../common/domain/value-objects/money.value";
import { Entity } from "../../../../common/domain/entities/entity";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";
import { PaymentMade } from "../../messages/events/payment-made";


export class Payment extends Entity{

  private customerId:number;
  private cartId:number;
  private price:Money;
  private date:DateTime;

  public constructor(id:number,customerId:number,cartId:number,price:Money,date:DateTime) {
    super(id);
    this.customerId=customerId;
    this.cartId=cartId;
    this.price=price;
    this.date=date;
  }

  public paidOut(){
    const event=new PaymentMade(this.customerId,this.cartId,this.price.getAmount(),this.date.getDate().toString());
    this.apply(event);
  }

  public getCustomerId():number{
    return this.customerId;
  }
  public getCartId():number{
    return this.cartId;
  }
  public getPrice():Money{
    return this.price;
  }

  public getDate():DateTime{
    return this.date;
  }
}
