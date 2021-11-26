import { Payment } from "../../domain/entities/payment";
import { PaymentSchema } from "../../infrastructure/persistence/typeorm/entities/payment.shema";
import { PriceTypeORM } from "../../../../common/infrastructure/persistence/typeorm/value-objects/PriceTypeORM";

export class PaymentMapper{
  public static toTypeORM(payment:Payment):PaymentSchema{
    let paymentTypeORM:PaymentSchema=new PaymentSchema();

    paymentTypeORM.customerId=payment.getCustomerId();
    paymentTypeORM.cartId=payment.getCartId();
    paymentTypeORM.price=PriceTypeORM.from(payment.getPrice().getAmount(),payment.getPrice().getCurrency());
    paymentTypeORM.date=payment.getDate().getDate().toString();

    return paymentTypeORM;
  }
}
