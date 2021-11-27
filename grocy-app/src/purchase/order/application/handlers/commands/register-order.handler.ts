import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterOrderCommand } from "../../../messages/commands/register-order-command";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderTypeORM } from "../../../infrastructure/persistence/typeorm/entities/orderTypeORM";
import { Repository } from "typeorm";
import { Order } from "../../../domain/entities/order";
import { OrderFactory } from "../../../domain/factories/order-factory";
import { Status } from "../../../../../common/domain/Enum/Status";
import { Money } from "../../../../../common/domain/value-objects/money.value";
import { OrderMapper } from "../../mapper/order.mapper";

@CommandHandler(RegisterOrderCommand)
export class RegisterOrderHandler
  implements ICommandHandler<RegisterOrderCommand>{
  constructor(
    @InjectRepository(OrderTypeORM)
    private orderRepository:Repository<OrderTypeORM>,
    private publisher:EventPublisher,
  ) {}

  async execute(command:RegisterOrderCommand){

    let orderId:number=0;
    let status:Status;
    let price:Money=Money.create(command.price,'Soles');


    if (command.status=='Done'){
      status=Status.Done
    }else if(command.status=='Cancel'){
      status=Status.Canceled
    }else{
      return orderId;
    }

    let order:Order =OrderFactory.createFrom(price, command.purchaseDate,status);

    let orderTyORM:OrderTypeORM=OrderMapper.toTypeORM(order);

    orderTyORM= await this.orderRepository.save(orderTyORM);

    if(orderTyORM==null){
      return orderId;
    }

    orderId=orderTyORM.id;

    order.changeId(orderId);

    return orderId;
  }
}

