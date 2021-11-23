
export class CartRegisteredEvents {

  constructor(
    public readonly id:number,
    public readonly customerId:number,
    public readonly productId:number,
    public readonly quantity:number,
    public readonly creationDate:string,
    public readonly state:string
  ) {}

}
