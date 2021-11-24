
export class RegisterOrderRequestDto{
  public constructor(
    public readonly price:number,
    public readonly status:string
  ) {}
}
