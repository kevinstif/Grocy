import { EventsHandler } from "@nestjs/cqrs/dist/utils/events-handler.decorator";
import { CommandBus, IEventHandler } from "@nestjs/cqrs";
import { CustomerPaid } from "../../../../../shoppingcart.context/cart/messages/events/customer-paid";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerSchema } from "../../../infrastructure/persistence/typeorm/entities/customer.schema";
import { Name } from "../../../../../common/domain/value-objects/name.value";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../../common/application/app.notification";
import { Money } from "../../../../../common/domain/value-objects/money.value";
import { Customer } from "../../../domain/entities/customer";
import { CustomerFactory } from "../../../domain/factories/customer-factory";
import { CustomerMapper } from "../../mapper/customer.mapper";

@EventsHandler(CustomerPaid)
export class CustomerPaidHandler implements IEventHandler<CustomerPaid>{
  constructor(
    private commandBus:CommandBus,
    @InjectRepository(CustomerSchema)
    private customerRepository:Repository<CustomerSchema>
  ) {}

  async handle(event: CustomerPaid) {
    let customerTypeORM: CustomerSchema = await this.customerRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where("id = :id")
      .setParameter("id", event.customerId)
      .getOne();
    if (customerTypeORM == null) {
      console.log("customer no existe");
      return;
    }
    const name:Result<AppNotification, Name>=Name.create(customerTypeORM.name.firstName,customerTypeORM.name.lastName);
    if(name.isFailure()){
      return;
    }
    const balance:Money=Money.create(customerTypeORM.balance.amount,customerTypeORM.balance.currency);

    let customer:Customer = CustomerFactory.withId(name.value, customerTypeORM.phone, customerTypeORM.address, balance, customerTypeORM.id);
    console.log("cualquier cosa")
    customer.subtract(event.price);
    console.log(customer)

    const editedCustomer=Object.assign(customerTypeORM,CustomerMapper.toTypeORM(customer));

    customerTypeORM=await this.customerRepository.save(editedCustomer);
    if(customerTypeORM!=null){
      console.log("Success")
    }else{
      console.log("Failed")
    }
  }
}