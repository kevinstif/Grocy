
export class RegisterOrderResponseDto{
  public constructor(
    public id:number,
    public readonly price:number,
    public readonly purchaseDate:string,
    public readonly status:string
  ) {}
}
