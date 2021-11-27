export class PaymentResponseDto {
  constructor(
    public readonly transactionId: number,
    public readonly accountNumber: string,
    public readonly amount: number,
    public readonly status: string,
  ) {}
}
