
export class PaymentMade{
  constructor(
    public readonly customerId:number,
    public readonly cartId:number,
    public readonly price:number,
    public readonly date:string,
  ) {}
}
