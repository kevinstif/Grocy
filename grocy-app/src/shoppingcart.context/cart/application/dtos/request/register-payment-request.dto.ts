export class RegisterPaymentRequestDto {
  public constructor(
    public readonly customerId: number,
    public readonly cartId: number,
    public readonly price:number,
  ) {
  }
}
