import { Supplier } from '../entities/supplier.entity';
import { SupplierId } from '../value-objects/supplier-id.value';
import { Ruc } from '../value-objects/ruc.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Phone } from "../value-objects/phone.value";

export class SupplierFactory {
  public static createFrom(name: Name, ruc: Ruc, phone: Phone): Supplier {
    return new Supplier(SupplierId.create(0), name, ruc, phone);
  }

  public static withId(supplierId: SupplierId, name: Name, ruc: Ruc, phone: Phone): Supplier {
    return new Supplier(supplierId, name, ruc, phone);
  }
}