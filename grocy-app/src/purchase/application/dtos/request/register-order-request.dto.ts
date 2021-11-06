import { Money } from "../../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";
import { Status } from "../../../../common/domain/Enum/Status";

export class RegisterOrderRequestDto{
  public constructor(
    public readonly price:Money,
    public readonly purchaseDate:DateTime,
    public readonly status:Status
  ) {}
}
