import { Module } from "@nestjs/common";
import { OrderController } from "./api/order.controller";
import { OrderApplicationServices } from "./application/services/order-application-services.service";
import { RegisterOrderHandler } from "./application/handlers/commands/register-order.handler";
import { OrderRegisteredHandler } from "./application/handlers/events/order-registered.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderSchema } from "./infrastructure/persistence/schemas/order.schema";
import { RegisterOrderValidator } from "./application/validators/register-order.validator";

export const CommandHandlers=[RegisterOrderHandler]
export const EventHandlers=[OrderRegisteredHandler]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([OrderSchema])
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
