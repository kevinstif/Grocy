export class EditSupplierRequestDto {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dni: string,
    public readonly phone: string,
  ) {}
}
