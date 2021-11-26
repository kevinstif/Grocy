import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppNotification } from "../../../../common/application/app.notification";
import { Payment } from "../../domain/entities/payment";
import { RegisterPaymentRequestDto } from "../dtos/request/register-payment-request.dto";
import { PaymentSchema } from "../../infrastructure/persistence/typeorm/entities/payment.shema";

@Injectable()
export class RegisterPaymentValidator {
  constructor(@InjectRepository(PaymentSchema) private paymentRepository:Repository<Payment>) {}

  public async validate(registerPaymentRequestDto:RegisterPaymentRequestDto):Promise<AppNotification>{
    let notification: AppNotification = new AppNotification();

    const customerId: number = registerPaymentRequestDto.customerId ? registerPaymentRequestDto.customerId:0;
    if (customerId <= 0) {
      notification.addError('CustomerId is required', null);
    }
    const cartId: number = registerPaymentRequestDto.cartId ? registerPaymentRequestDto.cartId:0;
    if (cartId <= 0) {
      notification.addError('CartId is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}
