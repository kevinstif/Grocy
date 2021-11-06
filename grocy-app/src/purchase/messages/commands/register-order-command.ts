import { Money } from "../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";
import { Status } from "../../../common/domain/Enum/Status";

export class RegisterOrderCommand{
  constructor(
    private readonly price:Money,
    private readonly purchaseDate:DateTime,
    private readonly status:Status
  ) {}
}
