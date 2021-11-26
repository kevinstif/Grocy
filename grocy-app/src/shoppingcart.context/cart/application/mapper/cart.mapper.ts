import { Cart } from "../../domain/entities/cart";
import { CartSchema } from "../../infrastructure/persistence/typeorm/entities/cart.schema";

export class CartMapper{
  public static toTypeORM(cart:Cart):CartSchema{
    let cartTypeORM:CartSchema=new CartSchema();

    cartTypeORM.creationDate=cart.GetCreationDate().getDate().toString();
    cartTypeORM.state=cart.GetState();
    cartTypeORM.quantity=cart.GetQuantity();

    return cartTypeORM;
  }
}
