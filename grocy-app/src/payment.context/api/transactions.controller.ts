import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { TransactionsApplicationService } from '../application/services/transactions-application.service';
import { PaymentRequestDto } from '../application/dtos/request/payment-request.dto';
import { PaymentResponseDto } from '../application/dtos/response/payment-response.dto';

@Controller('payment.context')
export class TransactionsController {
  constructor(
    private readonly transactionsApplicationService: TransactionsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/payment')
  async payment(
    @Body() depositRequestDto: PaymentRequestDto,
    @Res({ passthrough: true }) response,
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Promise<object> {
    try {
      const result: Result<AppNotification, PaymentResponseDto> =
        await this.transactionsApplicationService.deposit(depositRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
