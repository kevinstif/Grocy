import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterCustomerCommand } from "../../../messages/commands/register-customer-command";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerSchema } from "../../../infrastructure/persistence/typeorm/entities/customer.schema";
import { InsertResult, Repository } from "typeorm";
import { Customer } from "../../../domain/entities/customer";
import { CustomerFactory } from "../../../domain/factories/customer-factory";


@CommandHandler(RegisterCustomerCommand)
export class RegisterCustomerHandler
  implements ICommandHandler<RegisterCustomerCommand>{
  constructor(
    @InjectRepository(CustomerSchema)
    private customerRepository:Repository<Customer>,
    private publisher:EventPublisher,
  ) {}

  async execute(command:RegisterCustomerCommand){
    const customerEntity: Customer = CustomerFactory.createFrom(command.firstName, command.lastName, command.phone, command.address);
    console.log(customerEntity);
    const insertResult:InsertResult= await this.customerRepository.insert(customerEntity as any);
    console.log(insertResult);
    const customerId:number=Number(insertResult.identifiers[0].id);
    customerEntity.changeId(customerId);
    const customer: Customer = this.publisher.mergeObjectContext(customerEntity);
    customer.register();
    customer.commit();
    return customerId;
  }
}

