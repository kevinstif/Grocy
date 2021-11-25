import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterCustomerCommand } from "../../../messages/commands/register-customer-command";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerSchema } from "../../../infrastructure/persistence/typeorm/entities/customer.schema";
import { Customer } from "../../../domain/entities/customer";
import { CustomerFactory } from "../../../domain/factories/customer-factory";
import { Name } from "../../../../../common/domain/value-objects/name.value";
import { AppNotification } from "../../../../../common/application/app.notification";
import { Repository } from "typeorm";
import { Result } from "typescript-result";
import { CustomerMapper } from "../../mapper/customer.mapper";



@CommandHandler(RegisterCustomerCommand)
export class RegisterCustomerHandler
  implements ICommandHandler<RegisterCustomerCommand>{
  constructor(
    @InjectRepository(CustomerSchema)
    private customerRepository:Repository<CustomerSchema>,
    private publisher:EventPublisher,
  ) {}

  async execute(command:RegisterCustomerCommand){
    let customerId:number=0;
    const name:Result<AppNotification, Name>=Name.create(command.firstName,command.lastName);

    if (name.isFailure()){
      return customerId;
    }

    let customer:Customer=CustomerFactory.createFrom(name.value,command.phone,command.address)
    let customerTypeORM:CustomerSchema=CustomerMapper.toTypeORM(customer);

    customerTypeORM=await this.customerRepository.save(customerTypeORM);

    if (customerTypeORM==null){
      return customerId;
    }
    customerId=customerTypeORM.id;

    customer.changeId(customerId);

    return customerId;
  }
}

