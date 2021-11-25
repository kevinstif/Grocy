import { Name } from "../../../../common/domain/value-objects/name.value";

export class CustomerRegisteredEvents {
  constructor(
    public readonly id:number,
    public readonly name:Name,
    public readonly phone:string,
    public readonly address:string
  ) {}

}
