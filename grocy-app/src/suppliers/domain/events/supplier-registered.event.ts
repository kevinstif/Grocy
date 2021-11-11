export class SupplierRegisteredEvent {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly ruc: string,
    public readonly phone: string,
  ) {}
}