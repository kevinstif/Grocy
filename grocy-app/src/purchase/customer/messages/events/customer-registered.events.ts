
export class CustomerRegisteredEvents {
  constructor(
    public readonly id:number,
    public readonly firstName:string,
    public readonly lastName:string,
    public readonly phone:string,
    public readonly address:string
  ) {}

}
