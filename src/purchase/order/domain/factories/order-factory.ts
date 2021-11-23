import { Order } from "../entities/order";

export class OrderFactory{
  public static createFrom(price:number,purchaseDate:string,status:string):Order{
    return new Order(0,price,purchaseDate,status)
  }

  public static withId(price:number,purchaseDate:string,status:string,id:number):Order{
    return new Order(id,price,purchaseDate,status)
  }
}
