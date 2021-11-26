
export class RegisterCartRequestDto {
  public constructor(
    public readonly customerId:number,
    public readonly quantity:number,
    public readonly creationDate:string,
    public readonly price:number,
    public readonly state:string
  ) {}
}
