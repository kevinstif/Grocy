import { EventsHandler } from "@nestjs/cqrs/dist/utils/events-handler.decorator";
import { PaymentMade } from "../../../../../shoppingcart.context/cart/messages/events/payment-made";
import { CommandBus, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderTypeORM } from "../../../infrastructure/persistence/typeorm/entities/orderTypeORM";
import { Repository } from "typeorm";
import { Order } from "../../../domain/entities/order";
import { OrderFactory } from "../../../domain/factories/order-factory";
import { Money } from "../../../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../../../common/domain/value-objects/date-time.value";
import { Status } from "../../../../../common/domain/Enum/Status";
import { RegisterOrderCommand } from "../../../messages/commands/register-order-command";

@EventsHandler(PaymentMade)
export class PaymentMadeHandler implements IEventHandler<PaymentMade>{
  constructor(
    private commandBus:CommandBus,
    @InjectRepository(OrderTypeORM)
    private orderRepository:Repository<OrderTypeORM>
  ) {}
  async handle(event: PaymentMade) {
    let orderId:number=0;
    const date:DateTime=DateTime.utcNow();

    let registerOrderCommand:RegisterOrderCommand=new RegisterOrderCommand(event.price,date,"Done")

    orderId=await this.commandBus.execute(registerOrderCommand);

    if (orderId!=0){
      console.log("Order Registered");
    }else{
      console.log("Payment Failed");
    }
  }

}
