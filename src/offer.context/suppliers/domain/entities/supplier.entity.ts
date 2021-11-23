import { SupplierRegisteredEvent } from '../events/supplier-registered.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { SupplierId } from '../value-objects/supplier-id.value';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { Ruc } from '../value-objects/ruc.value';
import { Phone } from "../value-objects/phone.value";

export class Supplier extends AggregateRoot {
  private id: SupplierId;
  private name: Name;
  private ruc: Ruc;
  private phone: Phone;

  public constructor(id: SupplierId, name: Name, ruc: Ruc, phone: Phone) {
    super();
    this.id = id;
    this.name = name;
    this.ruc = ruc;
    this.phone = phone;
  }

  public register() {
    const event = new SupplierRegisteredEvent(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.ruc.getValue(), this.phone.getValue());
    this.apply(event);
  }

  public getId(): SupplierId {
    return this.id;
  }

  public getName(): Name {
    return this.name;
  }

  public getRuc(): Ruc {
    return this.ruc;
  }

  public getPhone(): Phone {
    return this.phone;
  }

  public changeId(id: SupplierId) {
    this.id = id;
  }
}
