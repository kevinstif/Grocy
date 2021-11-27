import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AccountIdFromTypeORM } from '../value-objects/account-id-from.typeorm';
import { AmountTypeORM } from '../value-objects/amount.typeorm';
import { PaymentStatus } from '../../../../domain/enums/Payment.status.enum';

@Entity('payment.context')
export class PaymentTypeorm {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column('char', { name: 'type', length: 1, nullable: false })
  public type: string;

  @Column((type) => AccountIdFromTypeORM, { prefix: false })
  public accountIdFrom: AccountIdFromTypeORM;

  @Column((type) => AmountTypeORM, { prefix: false })
  public amount: AmountTypeORM;

  @Column('tinyint', { name: 'status', width: 2, unsigned: true, nullable: false, })
  public status: PaymentStatus;

}