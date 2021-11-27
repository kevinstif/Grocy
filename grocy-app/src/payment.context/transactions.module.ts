import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayMoneyHandler } from './application/handlers/commands/pay-money.handler';
import { TransactionsApplicationService } from './application/services/transactions-application.service';
import { TransactionsController } from './api/transactions.controller';
import { PaymentMoneyValidator } from './application/validators/payment-money-validator.service';
import { PaymentTypeorm } from './infrastructure/persistence/typeorm/entities/payment.typeorm';
import { MoneyPayedHandler } from './application/handlers/events/money-payed.handler';
import { CompleteTransactionHandler } from './application/handlers/commands/complete-transaction.handler';

export const CommandHandlers = [PayMoneyHandler, CompleteTransactionHandler];
export const EventHandlers = [MoneyPayedHandler];
export const QueryHandlers = [];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PaymentTypeorm])],
  controllers: [TransactionsController],
  providers: [
    TransactionsApplicationService,
    PaymentMoneyValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ]
})
export class TransactionsModule {}