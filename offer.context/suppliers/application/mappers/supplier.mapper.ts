import { Supplier } from '../../domain/entities/supplier.entity';
import { SupplierTypeorm } from '../../infrastructure/persistence/typeorm/entities/supplier.typeorm';
import { SupplierIdTypeorm } from '../../infrastructure/persistence/typeorm/entities/supplier.id.typeorm';
import { NameTypeORM } from "../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm";
import { RucTypeORM } from "../../../../common/infrastructure/persistence/typeorm/entities/ruc.typeorm";
import { PhoneTypeORM } from "../../../../common/infrastructure/persistence/typeorm/entities/phone.typeorm";


export class SupplierMapper {
  public static toTypeORM(supplier: Supplier): SupplierTypeorm {
    const supplierTypeORM: SupplierTypeorm = new SupplierTypeorm();
    supplierTypeORM.id = SupplierIdTypeorm.from(supplier.getId().getValue());
    supplierTypeORM.name = NameTypeORM.from(supplier.getName().getFirstName(), supplier.getName().getLastName());
    supplierTypeORM.ruc = RucTypeORM.from(supplier.getRuc().getValue());
    supplierTypeORM.phone = PhoneTypeORM.from(supplier.getPhone().getValue());
    return supplierTypeORM;
  }
}
