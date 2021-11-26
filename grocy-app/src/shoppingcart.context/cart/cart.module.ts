import { Module } from "@nestjs/common";
import { CartController } from "./api/cart.controller";
import { CartApplicationServices } from "./application/services/cart-application-services.service";
import { RegisterCartHandler } from "./application/handlers/commands/register-cart.handler";
import { CartRegisteredHandler } from "./application/handlers/events/cart-registered.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartSchema } from "./infrastructure/persistence/typeorm/entities/cart.schema";
import { RegisterCartValidator } from "./application/validators/register-cart.validator";
import { PaymentCartHandler } from "./application/handlers/commands/payment-cart.handler";
import { PaymentSchema } from "./infrastructure/persistence/typeorm/entities/payment.shema";
import { RegisterPaymentValidator } from "./application/validators/register-payment.validator";
import { CustomerSchema } from "../../purchase/customer/infrastructure/persistence/typeorm/entities/customer.schema";

export const CommandHandlers=[RegisterCartHandler,PaymentCartHandler]
export const EventHandlers=[CartRegisteredHandler]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CartSchema,PaymentSchema,CustomerSchema])
  ],
  controllers:[CartController],
  providers:[
    CartApplicationServices,
    RegisterCartValidator,
    RegisterPaymentValidator,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class CartModule {}
