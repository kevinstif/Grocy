import { Customer } from "../entities/customer";
import { Name } from "../../../../common/domain/value-objects/name.value";

export class CustomerFactory {
  public static createFrom(name:Name,phone:string,address:string):Customer{
    return new Customer(0,name,phone,address)
  }

  public static withId(name:Name,phone:string,address:string,id:number):Customer{
    return new Customer(id,name,phone,address)
  }
}
