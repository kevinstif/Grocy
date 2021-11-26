import { DateTime } from "../../../../common/domain/value-objects/date-time.value";
import { Money } from "../../../../common/domain/value-objects/money.value";

export class CartRegisteredEvents {

  constructor(
    public readonly id:number,
    public readonly customerId:number,
    public readonly quantity:number,
    public readonly creationDate:DateTime,
    public readonly price:Money,
    public readonly state:string
  ) {}

}
