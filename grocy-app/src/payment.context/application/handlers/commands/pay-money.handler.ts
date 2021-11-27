import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayMoney } from '../../commands/pay-money.command';
//import { AccountTypeORM } from '../../../../accounts/infrastructure/persistence/typeorm/entities/account.typeorm';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/Enum/currency.enum';
import { PaymentTypeorm } from '../../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Payment } from '../../../domain/entities/Payment.entity';
import { PaymentFactory } from '../../../domain/factories/Payment.factory';
import { PaymentStatus } from '../../../domain/enums/Payment.status.enum';
import { Id } from '../../../../common/domain/value-objects/id.value';
import { TransactionMapper } from '../../mappers/transaction.mapper';
import { PaymentId } from '../../../domain/value-objects/Payment-id.value';

@CommandHandler(PayMoney)
export class PayMoneyHandler implements ICommandHandler<PayMoney> {
  constructor(
    @InjectRepository(PaymentTypeorm)
    private paymentRepository: Repository<PaymentTypeorm>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: PayMoney) {
    let paymentId = 0;
    const accountNumber: string = command.accountNumber.trim();

    const accountFromId: Id = Id.of(0);
    const amount: Money = Money.create(command.amount, Currency.SOLES);
    let transaction: Payment = PaymentFactory.createFrom(
      PaymentStatus.STARTED,
      accountFromId,
      amount,
    );
    let transactionTypeORM: PaymentTypeorm =
      TransactionMapper.toTypeORM(transaction);
    transactionTypeORM = await this.paymentRepository.save(transactionTypeORM);
    if (transactionTypeORM == null) {
      return paymentId;
    }
    paymentId = Number(transactionTypeORM.id);
    transaction.changeId(PaymentId.of(paymentId));
    transaction = this.publisher.mergeObjectContext(transaction);
    transaction.deposit();
    transaction.commit();
    return paymentId;
  }
}