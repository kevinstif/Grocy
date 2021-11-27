import { PaymentStatus } from '../enums/Payment.status.enum';
import { Id } from '../../../common/domain/value-objects/id.value';
import { Payment } from '../entities/Payment.entity';
import { Money } from '../../../common/domain/value-objects/money.value';

export class PaymentFactory {
  public static createFrom(
    status: PaymentStatus,
    accountIdFrom: Id,
    amount: Money,
  ): Payment {
    return new Payment(status, accountIdFrom, amount);
  }
}