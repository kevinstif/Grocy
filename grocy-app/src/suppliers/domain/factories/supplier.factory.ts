import { Supplier } from '../entities/supplier.entity';
import { SupplierId } from '../value-objects/supplier-id.value';
import { Dni } from '../value-objects/dni.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Phone } from "../value-objects/phone.value";

export class SupplierFactory {
  public static createFrom(name: Name, dni: Dni, phone: Phone): Supplier {
    return new Supplier(SupplierId.create(0), name, dni, phone);
  }

  public static withId(supplierId: SupplierId, name: Name, dni: Dni, phone: Phone): Supplier {
    return new Supplier(supplierId, name, dni, phone);
  }
}