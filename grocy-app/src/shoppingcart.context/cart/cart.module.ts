import { Module } from "@nestjs/common";
import { CartController } from "./api/cart.controller";
import { CartApplicationServices } from "./application/services/cart-application-services.service";
import { RegisterCartHandler } from "./application/handlers/commands/register-cart.handler";
import { CartRegisteredHandler } from "./application/handlers/events/cart-registered.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartSchema } from "./infrastructure/persistence/schemas/cart.schema";
import { RegisterCartValidator } from "./application/validators/register-cart.validator";

export const CommandHandlers=[RegisterCartHandler]
export const EventHandlers=[CartRegisteredHandler]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CartSchema])
  ],
  controllers:[CartController],
  providers:[
    CartApplicationServices,
    RegisterCartValidator,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class CartModule {}
