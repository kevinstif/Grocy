import { Entity } from "../../../../common/domain/entities/entity";
import { CustomerRegisteredEvents } from "../../messages/events/customer-registered.events";
import { Name } from "../../../../common/domain/value-objects/name.value";
import { Money } from "../../../../common/domain/value-objects/money.value";

export class Customer extends Entity {
  private name:Name;
  private phone:string;
  private address:string;
  private balance:Money;


  public constructor(id:number,name:Name,phone:string,address:string, balance:Money) {
    super(id);
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.balance = balance;
  }
  public register(){
    const event=new CustomerRegisteredEvents(this.id, this.name, this.phone, this.address, this.balance.getAmount());
    this.apply(event);
  }

  public getName():Name{
    return this.name
  }
  public getPhone():string{
    return this.phone
  }
  public getAddress():string{
    return this.address
  }
  public getBalance():Money{
    return this.balance
  }
  public subtract(price: number) {

    this.balance = Money.create(this.balance.getAmount() - price,this.balance.getCurrency());
  }
}
