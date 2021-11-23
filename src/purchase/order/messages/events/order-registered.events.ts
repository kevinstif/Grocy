
export class OrderRegisteredEvents{
  constructor(
    public readonly id:number,
    public readonly price:number,
    public readonly purchaseDate:string,
    public readonly status:string
  ) {}
}
