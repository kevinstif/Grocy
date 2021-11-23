import { Module } from "@nestjs/common";
import { CustomerController } from "./api/customer.controller";
import { CustomerApplicationServices } from "./application/services/customer-application-services.service";
import { RegisterCustomerHandler } from "./application/handlers/commands/register-customer.handler";
import { CustomerRegisteredHandler } from "./application/handlers/events/customer-registered.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerSchema } from "./infrastructure/persistence/typeorm/entities/customer.schema";
import { RegisterCustomerValidator } from "./application/validators/register-customer.validator";

export const CommandHandlers=[RegisterCustomerHandler]
export const EventHandlers=[CustomerRegisteredHandler]

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CustomerSchema])
  ],
  controllers:[CustomerController],
  providers:[
    CustomerApplicationServices,
    RegisterCustomerValidator,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class CustomerModule {}
