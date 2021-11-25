import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderTypeORM } from "../../infrastructure/persistence/typeorm/entities/orderTypeORM";
import { Repository } from "typeorm";
import { Order } from "../../domain/entities/order";
import { RegisterOrderRequestDto } from "../dtos/request/register-order-request.dto";
import { AppNotification } from "../../../../common/application/app.notification";
import { Result } from "typescript-result";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";

@Injectable()
export class RegisterOrderValidator{
  constructor(@InjectRepository(OrderTypeORM) private orderRepository:Repository<Order>) {}

  public async validate(registerOrderRequestDto:RegisterOrderRequestDto):Promise<AppNotification>{

    let notification: AppNotification = new AppNotification();

    const price: number = registerOrderRequestDto.price ? registerOrderRequestDto.price:0;
    const status: string = registerOrderRequestDto.status ? registerOrderRequestDto.status.trim():'';

    if (price <= 0) {
      notification.addError('Order price is required', null);
    }
    if (status.length <= 0) {
      notification.addError('Order status is required', null);
    }
    if (status!= 'Done' && status!='Cancel') {
      notification.addError('Order status is invalid use Done || Cancel', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;

  }

}
