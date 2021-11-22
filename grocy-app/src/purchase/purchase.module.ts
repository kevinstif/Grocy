import { Module } from "@nestjs/common";
import { OrderApplicationServices } from "./order/application/services/order-application-services.service";
import { RegisterOrderHandler } from "./order/application/handlers/commands/register-order.handler";
import { OrderRegisteredHandler } from "./order/application/handlers/events/order-registered.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderTypeORM } from "./order/infrastructure/persistence/typeorm/entities/orderTypeORM";
import { RegisterOrderValidator } from "./order/application/validators/register-order.validator";
import { OrderController } from "./order/api/order.controller";
import { ProductsController } from "./product/api/products.controller";
import { ProductApplicationService } from "./product/application/services/product-application.service";
import { RegisterProductValidator } from "./product/application/validators/register-product.validator";
import { ProductTypeORM } from "./product/infrastructure/persistence/typeorm/entities/productTypeORM";

export const CommandHandlers=[RegisterOrderHandler]
export const EventHandlers=[OrderRegisteredHandler]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([OrderTypeORM,ProductTypeORM])
  ],
  controllers:[OrderController,ProductsController],
  providers:[
    OrderApplicationServices,
    RegisterOrderValidator,
    ProductApplicationService,
    RegisterProductValidator,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class PurchaseModule{}
