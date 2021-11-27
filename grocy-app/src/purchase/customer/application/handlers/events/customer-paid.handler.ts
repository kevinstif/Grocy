import { EventsHandler } from "@nestjs/cqrs/dist/utils/events-handler.decorator";
import { EventPublisher, IEventHandler } from "@nestjs/cqrs";
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
import { Payment } from "../../../../../shoppingcart.context/cart/domain/entities/payment";
import { PaymentFactory } from "../../../../../shoppingcart.context/cart/domain/factories/payment-factory";
import { DateTime } from "../../../../../common/domain/value-objects/date-time.value";

@EventsHandler(CustomerPaid)
export class CustomerPaidHandler implements IEventHandler<CustomerPaid>{
  constructor(
    private publisher:EventPublisher,
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
    if (customerTypeORM.balance.amount<event.price){
      console.log("saldo insuficiente")
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
    if(customerTypeORM==null){
      console.log("Failed")
      return;
    }
    console.log("Shopping cart is Paid")
    const price:Money=Money.create(event.price,customerTypeORM.balance.currency);
    let payment:Payment=PaymentFactory.createFrom(event.customerId,event.cartId,price,DateTime.utcNow())
    payment=this.publisher.mergeObjectContext(payment);
    payment.paidOut();
    payment.commit();
  }
}
