export class RegisterSupplierResponseDto {
  constructor(
    public id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dni: string,
    public readonly phone: string,
  ) {}
}
