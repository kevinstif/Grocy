import { Payment } from "../entities/payment";
import { Money } from "../../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";

export class PaymentFactory {
  public static createFrom(customerId:number,cartId:number,price:Money,date:DateTime):Payment{
    return new Payment(0,customerId,cartId,price,date)
  }
}
