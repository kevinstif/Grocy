import { DateTime } from "../../../../common/domain/value-objects/date-time.value";

export class MakePaymentCommand{
  constructor(
    public readonly cartId:number,
    public readonly customerId:number,
    public readonly date:DateTime
  ) {}
}
