import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { PaymentMoneyValidator } from '../validators/payment-money-validator.service';
import { PaymentRequestDto } from '../dtos/request/payment-request.dto';
import { PayMoney } from '../commands/pay-money.command';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import {
  PaymentStatus,
  PaymentStatusLabel,
} from '../../domain/enums/Payment.status.enum';
import { PaymentResponseDto } from '../dtos/response/payment-response.dto';

@Injectable()
export class TransactionsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private depositValidator: PaymentMoneyValidator,
  ) {}

  async payment(
    depositRequestDto: PaymentRequestDto,
  ): Promise<Result<AppNotification, PaymentResponseDto>> {
    const notification: AppNotification = await this.depositValidator.validate(
      depositRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const depositMoney: PayMoney = new PayMoney(
      depositRequestDto.accountNumber,
      depositRequestDto.amount,
      PaymentStatus.STARTED,
      DateTime.utcNow(),
    );
    const transactionId: number = await this.commandBus.execute(depositMoney);
    const depositResponseDto: PaymentResponseDto = new PaymentResponseDto(
      transactionId,
      depositRequestDto.accountNumber,
      depositRequestDto.amount,
      PaymentStatusLabel.get(PaymentStatus.STARTED),
    );
    return Result.ok(depositResponseDto);
  }
}
