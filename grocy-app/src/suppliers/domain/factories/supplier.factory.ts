import { Supplier } from '../entities/supplier.entity';
import { SupplierId } from '../value-objects/supplier-id.value';
import { Dni } from '../value-objects/dni.value';
import { Name } from '../../../common/domain/value-objects/name.value';

export class SupplierFactory {
  public static createFrom(name: Name, dni: Dni): Supplier {
    return new Supplier(SupplierId.create(0), name, dni);
  }

  public static withId(supplierId: SupplierId, name: Name, dni: Dni): Supplier {
    return new Supplier(supplierId, name, dni);
  }
}