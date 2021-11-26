import { DateTime } from "../../../../common/domain/value-objects/date-time.value";

export class CartRegisteredEvents {

  constructor(
    public readonly id:number,
    public readonly customerId:number,
    public readonly quantity:number,
    public readonly creationDate:DateTime,
    public readonly state:string
  ) {}

}
