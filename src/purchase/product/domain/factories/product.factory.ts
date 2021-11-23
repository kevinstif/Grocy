import { Product } from "../entities/product";

export class ProductFactory{
  public static createFrom(name:string,type:string,price:number,stock:number):Product{
    return new Product(0,name,type,price,stock);
  }

  public static withId(id:number,name:string,type:string,price:number,stock:number):Product{
    return new Product(id,name,type,price,stock);
  }
}
