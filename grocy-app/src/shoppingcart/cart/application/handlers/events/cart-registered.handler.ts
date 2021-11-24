import { EventsHandler } from "@nestjs/cqrs/dist/utils/events-handler.decorator";
import { CartRegisteredEvents } from "../../../messages/events/cart-registered.events";
import { IEventHandler } from "@nestjs/cqrs";

@EventsHandler(CartRegisteredEvents)
export class CartRegisteredHandler implements IEventHandler<CartRegisteredEvents>{
  constructor() {}

  handle(event: CartRegisteredEvents){
    console.log(event);
  }
}
