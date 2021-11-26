export class PaymentCartRequestDto{
  constructor(
    public readonly cartId:number,
    public readonly customerId:number,
  ) {}
}
