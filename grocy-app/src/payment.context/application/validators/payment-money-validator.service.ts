import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { PaymentRequestDto } from '../dtos/request/payment-request.dto';

@Injectable()
export class PaymentMoneyValidator {
  //injectar costumer type orm
  //constructor(@InjectRepository(AccountTypeORM) private accountRepository: Repository<AccountTypeORM>) {}

  public async validate(
    depositRequestDto: PaymentRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const accountNumber: string = depositRequestDto.accountNumber.trim();
    if (accountNumber.length <= 0) {
      notification.addError('Account number is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const amount: number = depositRequestDto.amount;
    if (amount <= 0) {
      notification.addError('Amount must be greater than zero', null);
    }
    return notification;
  }
}