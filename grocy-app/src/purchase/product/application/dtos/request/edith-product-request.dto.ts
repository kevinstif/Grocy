export class EdithProductRequestDto{
  constructor(
    public readonly name:string,
    public readonly type:string,
    public readonly price:number,
    public readonly stock:number
  ) {}
}
