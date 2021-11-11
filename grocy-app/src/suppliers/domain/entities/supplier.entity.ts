import { SupplierRegisteredEvent } from '../events/supplier-registered.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { SupplierId } from '../value-objects/supplier-id.value';
import { Dni } from '../value-objects/dni.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Phone } from "../value-objects/phone.value";

export class Supplier extends AggregateRoot {
  private id: SupplierId;
  private name: Name;
  private dni: Dni;
  private phone: Phone;

  public constructor(id: SupplierId, name: Name, dni: Dni, phone: Phone) {
    super();
    this.id = id;
    this.name = name;
    this.dni = dni;
    this.phone = phone;
  }

  public register() {
    const event = new SupplierRegisteredEvent(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue(), this.phone.getValue());
    this.apply(event);
  }

  public getId(): SupplierId {
    return this.id;
  }

  public getName(): Name {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

  public getPhone(): Phone {
    return this.phone;
  }

  public changeId(id: SupplierId) {
    this.id = id;
  }
}