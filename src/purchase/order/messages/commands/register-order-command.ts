export class RegisterOrderCommand{
  constructor(
    public readonly price:number,
    public readonly purchaseDate:string,
    public readonly status:string
  ) {}
}
