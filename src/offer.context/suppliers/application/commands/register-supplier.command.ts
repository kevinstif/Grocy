export class RegisterSupplierCommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly ruc: string,
    public readonly phone: string,
  ) {}
}