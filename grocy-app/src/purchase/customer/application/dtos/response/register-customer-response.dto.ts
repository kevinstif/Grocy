
export class RegisterCustomerResponseDto {
  public constructor(
    public id:number,
    public readonly firstName:string,
    public readonly lastName:string,
    public readonly phone:string,
    public readonly address:string,
    public readonly balance:number
  ) {}
}
