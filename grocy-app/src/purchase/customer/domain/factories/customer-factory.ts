import { Customer } from "../entities/customer";

export class CustomerFactory {
  public static createFrom(firstName:string,lastName:string,phone:string,address:string):Customer{
    return new Customer(0,firstName,lastName,phone,address)
  }

  public static withId(firstName:string,lastName:string,phone:string,address:string,id:number):Customer{
    return new Customer(id,firstName,lastName,phone,address)
  }
}
