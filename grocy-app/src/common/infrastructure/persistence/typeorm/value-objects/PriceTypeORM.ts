import { Column } from "typeorm";

export class PriceTypeORM{
  @Column('decimal', { name: 'amount', precision: 10, scale: 2, nullable: true })
  public amount: number;

  @Column('varchar', { name: 'currency', length: 10, nullable: true })
  public currency: string;

  private constructor(amount: number, currency: string) {
    this.amount = Number(amount);
    this.currency = currency;
  }

  public static from(amount: number, currency: string): PriceTypeORM {
    return new PriceTypeORM(amount, currency);
  }
}
