import { Product } from "../../domain/entities/product";
import { ProductTypeORM } from "../../infrastructure/persistence/typeorm/entities/productTypeORM";
import { PriceTypeORM } from "../../../../common/infrastructure/persistence/typeorm/value-objects/PriceTypeORM";

export class ProductMapper{
  public static toTypeORM(product: Product):ProductTypeORM{
    const productTypeORM:ProductTypeORM=new ProductTypeORM();
    productTypeORM.name=product.getName();
    productTypeORM.type=product.getType();
    productTypeORM.price=PriceTypeORM.from(product.getPrice().getAmount(),product.getPrice().getCurrency());
    productTypeORM.stock=product.getStock();

    return productTypeORM
  }
}
