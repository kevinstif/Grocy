import { PaymentStatus } from '../enums/Payment.status.enum';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';

export class MoneyPayed {
  constructor(
    public readonly transactionId: number,
    public readonly accountIdFrom: number,
    public readonly amount: number,
    public readonly status: PaymentStatus,
    public readonly createdAt: DateTime,
  ) {
  }
}