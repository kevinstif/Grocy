import { Cart } from "../entities/cart";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";

export class CartFactory {
  public static createFrom(customerId:number,quantity:number,creationDate:DateTime,state:string):Cart{
    return new Cart(0,customerId,quantity,creationDate,state)
  }

  public static withId(customerId:number,quantity:number,creationDate:DateTime,state:string,id:number):Cart{
    return new Cart(id,customerId,quantity,creationDate,state)
  }
}
