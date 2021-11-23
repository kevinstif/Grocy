import { Cart } from "../entities/cart";

export class CartFactory {
  public static createFrom(customerId:number,productId:number,quantity:number,creationDate:string,state:string):Cart{
    return new Cart(0,customerId,productId,quantity,creationDate,state)
  }

  public static withId(customerId:number,productId:number,quantity:number,creationDate:string,state:string,id:number):Cart{
    return new Cart(id,customerId,productId,quantity,creationDate,state)
  }
}
