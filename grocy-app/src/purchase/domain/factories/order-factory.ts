import { Money } from "../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";
import { Status } from "../../../common/domain/Enum/Status";
import { Id } from "../../../common/domain/value-objects/id.value";
import { Order } from "../entities/order";

export class OrderFactory{
  public static createFrom(price:number,purchaseDate:string,status:string):Order{
    return new Order(0,price,purchaseDate,status)
  }

  public static withId(price:number,purchaseDate:string,status:string,id:number):Order{
    return new Order(id,price,purchaseDate,status)
  }
}