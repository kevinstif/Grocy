import { Money } from "../../../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../../../common/domain/value-objects/date-time.value";

export class RegisterPaymentResponseDto {
  public constructor(
    public id:number,
    public readonly customerId:number,
    public readonly cartId:number,
    public readonly price:Money,
    public readonly date:DateTime
  ) {}
}
