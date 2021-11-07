import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderSchema } from "../../infraestructure/persistence/schemas/order.schema";
import { Repository } from "typeorm";
import { Order } from "../../domain/entities/order";
import { RegisterOrderRequestDto } from "../dtos/request/register-order-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { Money } from "../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";

@Injectable()
export class RegisterOrderValidator{
  constructor(@InjectRepository(OrderSchema) private orderRepository:Repository<Order>) {}

  public async validate(registerOrderRequestDto:RegisterOrderRequestDto):Promise<AppNotification>{
    let notification: AppNotification = new AppNotification();
    const price: Money = registerOrderRequestDto.price;
    if (price.getAmount() <= 0) {
      notification.addError('Order price is required', null);
    }
    const Date: DateTime = registerOrderRequestDto.purchaseDate;
    const purchaseDate:string=Date.getDate().toString().trim();
    if (purchaseDate.length <= 0) {
      notification.addError('Order purchaseDate is required', null);
    }
    const dni: string = registerOrderRequestDto.status.toString().trim();
    if (dni.length <= 0) {
      notification.addError('Order status is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;

  }

}
