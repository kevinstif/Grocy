export class SupplierId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new SupplierId(value);
  }

  public getValue(): number {
    return this.value;
  }
}