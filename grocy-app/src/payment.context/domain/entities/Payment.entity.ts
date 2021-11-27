import { Money } from '../../../common/domain/value-objects/money.value';
import { AggregateRoot } from '@nestjs/cqrs';
import { PaymentId } from '../value-objects/Payment-id.value';
import { Id } from '../../../common/domain/value-objects/id.value';
import { PaymentStatus } from '../enums/Payment.status.enum';
import { MoneyPayed } from '../events/money-payed.event';

export class Payment extends AggregateRoot {
  private id: PaymentId;
  private readonly status: PaymentStatus;
  private readonly accountFrom: Id;
  private readonly amount: Money;

  public constructor(
    status: PaymentStatus,
    accountFrom: Id,
    amount: Money,
  ) {
    super();
    this.status = status;
    this.accountFrom = accountFrom;
    this.amount = amount;
  }

  public deposit() {
    const event = new MoneyPayed(
      this.id.getValue(),
      this.accountFrom.getValue(),
      this.amount.getAmount(),
      this.status,
      null,
    );
    this.apply(event);
  }

  public getId(): PaymentId {
    return this.id;
  }

  public getStatus(): PaymentStatus {
    return this.status;
  }

  public getAccountFrom(): Id {
    return this.accountFrom;
  }

  public getAmount(): Money {
    return this.amount;
  }

  public changeId(id: PaymentId) {
    this.id = id;
  }
}
