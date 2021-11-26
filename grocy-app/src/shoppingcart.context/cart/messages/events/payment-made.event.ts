import { Money } from "../../../../common/domain/value-objects/money.value";

export class PaymentMadeEvent{
  constructor(
    public readonly customerId:number,
    public readonly price:Money,
    public readonly cartId,
  ) {}
}
