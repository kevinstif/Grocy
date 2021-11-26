import { DateTime } from "../../../../common/domain/value-objects/date-time.value";

export class RegisterCartCommand {
  constructor(
    public readonly customerId:number,
    public readonly quantity:number,
    public readonly creationDate:DateTime,
    public readonly state:string
  ) {}
}
