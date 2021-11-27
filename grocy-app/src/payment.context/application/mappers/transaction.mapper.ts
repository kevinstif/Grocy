import { Payment } from '../../domain/entities/Payment.entity';
import { PaymentTypeorm } from '../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { AccountIdFromTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/account-id-from.typeorm';
import { AmountTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/amount.typeorm';

export class TransactionMapper {
  public static toTypeORM(transaction: Payment): PaymentTypeorm {
    const transactionTypeORM: PaymentTypeorm = new PaymentTypeorm();
    transactionTypeORM.type = transaction.getType();
    transactionTypeORM.status = transaction.getStatus();
    transactionTypeORM.accountIdFrom = AccountIdFromTypeORM.from(transaction.getAccountFrom().getValue());
    transactionTypeORM.accountIdTo = transaction.getAccountTo() != null ? AccountIdFromTypeORM.from(transaction.getAccountTo().getValue()) : null;
    transactionTypeORM.amount = AmountTypeORM.from(transaction.getAmount().getAmount(), transaction.getAmount().getCurrency());
    return transactionTypeORM;
  }
}