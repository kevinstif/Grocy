import { Order } from "../../domain/entities/order";
import { OrderTypeORM } from "../../infrastructure/persistence/typeorm/entities/orderTypeORM";
import { PriceTypeORM } from "../../../../common/infrastructure/persistence/typeorm/value-objects/PriceTypeORM";

export class OrderMapper{
  public static toTypeORM(order:Order):OrderTypeORM{
    const orderTypeORM:OrderTypeORM=new OrderTypeORM();
    orderTypeORM.price=PriceTypeORM.from(order.GetPrice().getAmount(),order.GetPrice().getCurrency());
    orderTypeORM.status=order.GetStatus();
    orderTypeORM.purchaseDate=order.GetPurchaseDate().getDate().toString();

    return orderTypeORM;
  }
}
