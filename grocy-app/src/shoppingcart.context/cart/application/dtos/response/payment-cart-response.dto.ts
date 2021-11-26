export class PaymentCartResponseDto{
  constructor(
    public readonly cartId:number,
    public readonly customerId:number,
    public readonly date:string,
    public readonly status:string
  ) {}
}
