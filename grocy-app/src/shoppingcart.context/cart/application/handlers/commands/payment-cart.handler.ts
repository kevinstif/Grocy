import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { MakePaymentCommand } from "../../../messages/commands/make-payment.command";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerSchema } from "../../../../../purchase/customer/infrastructure/persistence/typeorm/entities/customer.schema";
import { Repository } from "typeorm";
import { CartSchema } from "../../../infrastructure/persistence/typeorm/entities/cart.schema";
import { Payment } from "../../../domain/entities/payment";
import { PaymentFactory } from "../../../domain/factories/payment-factory";
import { Money } from "../../../../../common/domain/value-objects/money.value";

@CommandHandler(MakePaymentCommand)
export class PaymentCartHandler implements ICommandHandler<MakePaymentCommand>{
  constructor(
    @InjectRepository(CustomerSchema)
    private customerRepository:Repository<CustomerSchema>,
    @InjectRepository(CartSchema)
    private cartRepository:Repository<CartSchema>,
    private publisher:EventPublisher
  ) {}

  async execute(command: MakePaymentCommand) {
    //customer existe?
    const customerTypeORM: CustomerSchema = await this.customerRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where("id = :id")
      .setParameter("id", command.customerId)
      .getOne();
    if (customerTypeORM == null) {
      return "customer not exist";
    }
    //cart exixte?
    const cartTypeORM: CartSchema = await this.cartRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where("id = :id")
      .setParameter("id", command.cartid)
      .getOne();
    if (cartTypeORM == null) {
      return "shopping cart not exist";
    }

    let price:Money=Money.create(command.price,"Soles")

    let payment:Payment=PaymentFactory.createFrom(command.customerId,command.cartid,price,command.date)
    // Emitir evento

    payment=this.publisher.mergeObjectContext(payment);
    payment.paidOut();
    payment.commit();
  }
}
