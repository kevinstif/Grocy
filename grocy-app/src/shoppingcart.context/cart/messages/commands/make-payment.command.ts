import { DateTime } from "../../../../common/domain/value-objects/date-time.value";

export class MakePaymentCommand{
  constructor(
    public readonly customerId:number,
    public readonly cartid:number,
    public readonly price:number,
    public readonly date:DateTime,
  ) {}
}
