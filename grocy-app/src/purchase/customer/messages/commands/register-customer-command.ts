export class RegisterCustomerCommand {
  constructor(
    public readonly firstName:string,
    public readonly lastName:string,
    public readonly phone:string,
    public readonly address:string,
    public readonly balance:number
  ) {}
}
