import { Entity } from "../../../../common/domain/entities/entity";
import { CustomerRegisteredEvents } from "../../messages/events/customer-registered.events";
import { Name } from "../../../../common/domain/value-objects/name.value";

export class Customer extends Entity {
  private name:Name;
  private phone:string;
  private address:string;


  public constructor(id:number,name:Name,phone:string,address:string) {
    super(id);
    this.name = name;
    this.phone = phone;
    this.address = address;
  }
  public register(){
    const event=new CustomerRegisteredEvents(this.id, this.name, this.phone, this.address);
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

}
