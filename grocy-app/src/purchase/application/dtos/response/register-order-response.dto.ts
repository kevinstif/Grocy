import { Money } from "../../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";
import { Status } from "../../../../common/domain/Enum/Status";

export class RegisterOrderResponseDto{
  public constructor(
    public id:number,
    public readonly price:number,
    public readonly purchaseDate:string,
    public readonly status:string
  ) {}
}