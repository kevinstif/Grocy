import { Module } from "@nestjs/common";
import { OrderApplicationServices } from "./application/services/order-application-services.service";
import { RegisterOrderHandler } from "./application/handlers/commands/register-order.handler";
import { OrderRegisteredHandler } from "./application/handlers/events/order-registered.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderTypeORM } from "./infrastructure/persistence/typeorm/entities/orderTypeORM";
import { RegisterOrderValidator } from "./application/validators/register-order.validator";
import { OrderController } from "./api/order.controller";

export const CommandHandlers=[RegisterOrderHandler]
export const EventHandlers=[OrderRegisteredHandler]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([OrderTypeORM])
  ],
  controllers:[OrderController],
  providers:[
    OrderApplicationServices,
    RegisterOrderValidator,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class PurchaseModule{}
