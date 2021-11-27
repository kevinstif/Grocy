export class CustomerPaid{
  constructor(
    public readonly customerId:number,
    public readonly price:number,
  ) {}
}