export class PaymentRequestDto {
  constructor(
    public readonly accountNumber: string,
    public readonly amount: number,
  ) {}
}
