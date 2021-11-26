import { Money } from "../../../../common/domain/value-objects/money.value";
import { Entity } from "../../../../common/domain/entities/entity";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";

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
    console.log("este es el evento de pago")
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
