import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { SupplierIdTypeorm } from './supplier.id.typeorm';
import { NameTypeORM } from '../../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';

@Entity('suppliers')
@Unique('UQ_customers_dni', ['dni.value'])
export class SupplierTypeorm {
  @Column((type) => SupplierIdTypeorm, { prefix: false })
  public id: SupplierIdTypeorm;

  @Column((type) => NameTypeORM, { prefix: false })
  public name: NameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;
}
