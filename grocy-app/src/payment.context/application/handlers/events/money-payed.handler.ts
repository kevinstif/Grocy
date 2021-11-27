import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { MoneyPayed } from '../../../domain/events/money-payed.event';

@EventsHandler(MoneyPayed)
export class MoneyPayedHandler implements IEventHandler<MoneyPayed> {
  constructor(
  ) {}

  async handle(event: MoneyPayed) {
    console.log('Transaction BC - handle MoneyTransferred');
  }
}