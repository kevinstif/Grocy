import { DateTime } from "../../../../common/domain/value-objects/date-time.value";

export class RegisterOrderCommand{
  constructor(
    public readonly price:number,
    public readonly purchaseDate:DateTime,
    public readonly status:string
  ) {}
}
