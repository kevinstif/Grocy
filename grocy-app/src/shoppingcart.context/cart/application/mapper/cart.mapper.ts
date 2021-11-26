import { Cart } from "../../domain/entities/cart";
import { CartSchema } from "../../infrastructure/persistence/typeorm/entities/cart.schema";
import { PriceTypeORM } from "../../../../common/infrastructure/persistence/typeorm/value-objects/PriceTypeORM";

export class CartMapper{
  public static toTypeORM(cart:Cart):CartSchema{
    let cartTypeORM:CartSchema=new CartSchema();

    cartTypeORM.creationDate=cart.GetCreationDate().getDate().toString();
    cartTypeORM.price=PriceTypeORM.from(cart.GetPrice().getAmount(),cart.GetPrice().getCurrency());
    cartTypeORM.state=cart.GetState();
    cartTypeORM.quantity=cart.GetQuantity();

    return cartTypeORM;
  }
}
