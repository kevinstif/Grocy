import { SupplierRegisteredEvent } from '../../../domain/events/supplier-registered.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

@EventsHandler(SupplierRegisteredEvent)
export class SupplierRegisteredHandler implements IEventHandler<SupplierRegisteredEvent> {
  constructor() {}

  handle(event: SupplierRegisteredEvent) {
    console.log('handle logic for SupplierRegisteredEvent');
    console.log(event);
  }
}