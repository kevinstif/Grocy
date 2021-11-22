import { Supplier } from '../../domain/entities/supplier.entity';
import { SupplierTypeorm } from '../../infrastructure/persistence/typeorm/entities/supplier.typeorm';
import { SupplierIdTypeorm } from '../../infrastructure/persistence/typeorm/entities/supplier.id.typeorm';
import { NameTypeORM } from '../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';

export class SupplierMapper {
  public static toTypeORM(supplier: Supplier): SupplierTypeorm {
    const supplierTypeORM: SupplierTypeorm = new SupplierTypeorm();
    supplierTypeORM.id = SupplierIdTypeorm.from(supplier.getId().getValue());
    supplierTypeORM.name = NameTypeORM.from(supplier.getName().getFirstName(), supplier.getName().getLastName());
    supplierTypeORM.dni = DniTypeORM.from(supplier.getDni().getValue());
    return supplierTypeORM;
  }
}