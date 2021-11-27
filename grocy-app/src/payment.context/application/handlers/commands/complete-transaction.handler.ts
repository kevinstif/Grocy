import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentTypeorm } from '../../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { PaymentStatus } from '../../../domain/enums/Payment.status.enum';
import { CompleteTransaction } from '../../commands/complete-transaction.command';

@CommandHandler(CompleteTransaction)
export class CompleteTransactionHandler
  implements ICommandHandler<CompleteTransaction>
{
  constructor(
    @InjectRepository(PaymentTypeorm)
    private transactionRepository: Repository<PaymentTypeorm>,
  ) {}

  async execute(command: CompleteTransaction) {
    const transactionId: number = command.transactionId;
    let transactionTypeORM: PaymentTypeorm =
      await this.transactionRepository
        .createQueryBuilder()
        .where('id = :id')
        .setParameter('id', transactionId)
        .getOne();
    if (transactionTypeORM == null) {
      return false;
    }
    transactionTypeORM.status = PaymentStatus.COMPLETED;
    transactionTypeORM = await this.transactionRepository.save(
      transactionTypeORM,
    );
    if (transactionTypeORM == null) {
      return false;
    }
    return true;
  }
}
