import { EventsHandler } from "@nestjs/cqrs/dist/utils/events-handler.decorator";
import { CustomerRegisteredEvents } from "../../../messages/events/customer-registered.events";
import { IEventHandler } from "@nestjs/cqrs";

@EventsHandler(CustomerRegisteredEvents)
export class CustomerRegisteredHandler implements IEventHandler<CustomerRegisteredEvents>{
  constructor() {}

  handle(event: CustomerRegisteredEvents){
    console.log(event);
  }
}
