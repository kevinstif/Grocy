import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { PaymentStatus } from '../../domain/enums/Payment.status.enum';

export class PayMoney {
  constructor(
    public readonly accountNumber: string,
    public readonly amount: number,
    public readonly status: PaymentStatus,
    public readonly createdAt: DateTime,
  ) {}
}
