import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterOrderCommand } from "../../../messages/commands/register-order-command";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderSchema } from "../../../infraestructure/persistence/schemas/order.schema";
import { InsertResult, Repository } from "typeorm";
import { Order } from "../../../domain/entities/order";
import { OrderFactory } from "../../../domain/factories/order-factory";


@CommandHandler(RegisterOrderCommand)
export class registerOrderHandler
  implements ICommandHandler<RegisterOrderCommand>{
  constructor(
    @InjectRepository(OrderSchema)
    private orderRepository:Repository<Order>,
    private publisher:EventPublisher,
  ) {}

  async execute(command:RegisterOrderCommand){
    const orderEntity:Order =OrderFactory.createFrom(command.price, command.purchaseDate,command.status);
    const insertResult:InsertResult= await this.orderRepository.insert(orderEntity);
    const orderId:number=Number(insertResult.identifiers[0].id);
    orderEntity.changeId(orderId);
    const order: Order= this.publisher.mergeObjectContext(orderEntity);
    order.register();
    order.commit();
    return orderId;
  }
}

