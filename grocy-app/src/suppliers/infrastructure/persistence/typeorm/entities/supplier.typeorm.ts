import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { SupplierIdTypeorm } from './supplier.id.typeorm';
import { NameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { RucTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/ruc.typeorm';
import { PhoneTypeORM } from "../../../../../common/infrastructure/persistence/typeorm/entities/phone.typeorm";

@Entity('suppliers')
@Unique('UQ_customers_ruc', ['ruc.value'])
export class SupplierTypeorm {
  @Column((type) => SupplierIdTypeorm, { prefix: false })
  public id: SupplierIdTypeorm;

  @Column((type) => NameTypeORM, { prefix: false })
  public name: NameTypeORM;

  @Column((type) => RucTypeORM, { prefix: false })
  public ruc: RucTypeORM;

  @Column((type) => PhoneTypeORM, { prefix: false })
  public phone: PhoneTypeORM;
}