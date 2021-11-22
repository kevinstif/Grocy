import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterOrderCommand } from "../../../messages/commands/register-order-command";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderTypeORM } from "../../../infrastructure/persistence/typeorm/entities/orderTypeORM";
import { InsertResult, Repository } from "typeorm";
import { Order } from "../../../domain/entities/order";
import { OrderFactory } from "../../../domain/factories/order-factory";


@CommandHandler(RegisterOrderCommand)
export class RegisterOrderHandler
  implements ICommandHandler<RegisterOrderCommand>{
  constructor(
    @InjectRepository(OrderTypeORM)
    private orderRepository:Repository<Order>,
    private publisher:EventPublisher,
  ) {}

  async execute(command:RegisterOrderCommand){
    const orderEntity:Order =OrderFactory.createFrom(command.price, command.purchaseDate,command.status);
    console.log(orderEntity);
    const insertResult:InsertResult= await this.orderRepository.insert(orderEntity as any);
    console.log(insertResult);
    const orderId:number=Number(insertResult.identifiers[0].id);
    orderEntity.changeId(orderId);
    const order: Order= this.publisher.mergeObjectContext(orderEntity);
    order.register();
    order.commit();
    return orderId;
  }
}

