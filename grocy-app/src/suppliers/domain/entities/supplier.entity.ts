import { SupplierRegisteredEvent } from '../events/supplier-registered.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { SupplierId } from '../value-objects/supplier-id.value';
import { Dni } from '../value-objects/dni.value';
import { Name } from '../../../common/domain/value-objects/name.value';

export class Supplier extends AggregateRoot {
  private id: SupplierId;
  private name: Name;
  private dni: Dni;

  public constructor(id: SupplierId, name: Name, dni: Dni) {
    super();
    this.id = id;
    this.name = name;
    this.dni = dni;
  }

  public register() {
    const event = new SupplierRegisteredEvent(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue());
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

  public changeId(id: SupplierId) {
    this.id = id;
  }
}