import { EventsHandler } from "@nestjs/cqrs/dist/utils/events-handler.decorator";
import { PaymentMade } from "../../../../../shoppingcart.context/cart/messages/events/payment-made";
import { IEventHandler } from "@nestjs/cqrs";

@EventsHandler(PaymentMade)
export class PaymentMadeHandler implements IEventHandler<PaymentMade>{
  constructor(
    
  ) {}
  async handle(event: PaymentMade) {
    console.log("evento handler")
  }

}
