import { Entity } from "../../../../common/domain/entities/entity";
import { CustomerRegisteredEvents } from "../../messages/events/customer-registered.events";

export class Customer extends Entity {
  private FirstName:string;
  private LastName:string;
  private Phone:string;
  private Address:string;


  public constructor(id:number,firstName:string,lastName:string,phone:string,address:string) {
    super(id);
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Phone = phone;
    this.Address = address;
  }
  public register(){
    const event=new CustomerRegisteredEvents(this.id, this.FirstName, this.LastName, this.Phone, this.Address);
    this.apply(event);
  }

}
