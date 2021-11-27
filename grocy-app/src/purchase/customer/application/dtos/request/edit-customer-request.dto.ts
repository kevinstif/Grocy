import { Money } from "../../../../../common/domain/value-objects/money.value";

export class EditCustomerRequestDto {
  public constructor(
    public readonly firstName:string,
    public readonly lastName:string,
    public readonly phone:string,
    public readonly address:string,
    public readonly balance:Money,
  ) {}
}
