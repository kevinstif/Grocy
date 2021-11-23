export class RegisterCartCommand {
  constructor(
    public readonly customerId:number,
    public readonly productId:number,
    public readonly quantity:number,
    public readonly creationDate:string,
    public readonly state:string
  ) {}
}
