import { EventsHandler } from "@nestjs/cqrs/dist/utils/events-handler.decorator";
import { OrderRegisteredEvents } from "../../../messages/events/order-registered.events";
import { IEventHandler } from "@nestjs/cqrs";

@EventsHandler(OrderRegisteredEvents)
export class OrderRegisteredHandler implements IEventHandler<OrderRegisteredEvents>{
  constructor() {}

  handle(event: OrderRegisteredEvents){
    console.log('handle logic for order registered event');
    console.log(event);
  }
}
