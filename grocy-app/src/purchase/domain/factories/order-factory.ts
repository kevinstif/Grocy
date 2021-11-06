import { Money } from "../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";
import { Status } from "../../../common/domain/Enum/Status";
import { Id } from "../../../common/domain/value-objects/id.value";
import { Order } from "../entities/order";

export class OrderFactory{
  public static createFrom(price:Money,purchaseDate:DateTime,status:Status):Order{
    return new Order(0,price,purchaseDate,status)
  }

  public static withId(price:Money,purchaseDate:DateTime,status:Status,id:number):Order{
    return new Order(id,price,purchaseDate,status)
  }
}
