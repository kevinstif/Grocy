
export class RegisterCartResponseDto {
  public constructor(
    public id:number,
    public readonly customerId:number,
    public readonly quantity:number,
    public readonly creationDate:string,
    public readonly state:string
  ) {}
}
