import { Customer } from "../entities/customer";
import { Name } from "../../../../common/domain/value-objects/name.value";
import { Money } from "../../../../common/domain/value-objects/money.value";

export class CustomerFactory {
  public static createFrom(name: Name, phone: string, address: string, balance: Money):Customer{
    return new Customer(0,name,phone,address,balance)
  }

  public static withId(name:Name,phone:string,address:string,balance: Money,id:number):Customer{
    return new Customer(id,name,phone,address,balance)
  }
}
