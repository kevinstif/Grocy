import { Product } from "../entities/product";
import { TypeProduct } from "../enums/type-product";
import { Money } from "../../../../common/domain/value-objects/money.value";

export class ProductFactory{
  public static createFrom(name:string,type:TypeProduct,price:Money,stock:number):Product{
    return new Product(0,name,type,price,stock);
  }

  public static withId(id:number,name:string,type:TypeProduct,price:Money,stock:number):Product{
    return new Product(id,name,type,price,stock);
  }
}
