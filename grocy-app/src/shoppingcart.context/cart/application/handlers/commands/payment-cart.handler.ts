import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { MakePaymentCommand } from "../../../messages/commands/make-payment.command";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerSchema } from "../../../../../purchase/customer/infrastructure/persistence/typeorm/entities/customer.schema";
import { Repository } from "typeorm";
import { CartSchema } from "../../../infrastructure/persistence/typeorm/entities/cart.schema";
import { Payment } from "../../../domain/entities/payment";
import { PaymentFactory } from "../../../domain/factories/payment-factory";
import { Money } from "../../../../../common/domain/value-objects/money.value";
import { PaymentSchema } from "../../../infrastructure/persistence/typeorm/entities/payment.shema";
import { PaymentMapper } from "../../mapper/payment.mapper";

@CommandHandler(MakePaymentCommand)
export class PaymentCartHandler implements ICommandHandler<MakePaymentCommand>{
  constructor(
    @InjectRepository(CustomerSchema)
    private customerRepository:Repository<CustomerSchema>,
    @InjectRepository(CartSchema)
    private cartRepository:Repository<CartSchema>,
    @InjectRepository(PaymentSchema)
    private paymentRepository:Repository<PaymentSchema>,
    private publisher:EventPublisher
  ) {}

  async execute(command: MakePaymentCommand) {
    let paymentId:number=0;
    //customer existe?
    const customerTypeORM: CustomerSchema = await this.customerRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where("id = :id")
      .setParameter("id", command.customerId)
      .getOne();
    if (customerTypeORM == null) {
      console.log("customer no existe");
      return paymentId;
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
      console.log("shopping cart not exist");
      return paymentId;
    }

    let price:Money=Money.create(command.price,"Soles")

    let payment:Payment=PaymentFactory.createFrom(command.customerId,command.cartid,price,command.date)

    console.log(command.date);
    let paymentTypeORM:PaymentSchema=PaymentMapper.toTypeORM(payment);

    paymentTypeORM= await this.paymentRepository.save(paymentTypeORM);

    if (paymentTypeORM==null){
      return paymentId;
    }

    paymentId=paymentTypeORM.id

    payment.changeId(paymentId);

    payment=this.publisher.mergeObjectContext(payment);
    payment.paidOut();
    payment.commit();

    return paymentId;
  }
}
