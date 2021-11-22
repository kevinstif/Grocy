import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderSchema } from "../../infrastructure/persistence/schemas/order.schema";
import { Repository } from "typeorm";
import { Order } from "../../domain/entities/order";
import { RegisterOrderRequestDto } from "../dtos/request/register-order-request.dto";
import { AppNotification } from "../../../common/application/app.notification";

@Injectable()
export class RegisterOrderValidator{
  constructor(@InjectRepository(OrderSchema) private orderRepository:Repository<Order>) {}

  public async validate(registerOrderRequestDto:RegisterOrderRequestDto):Promise<AppNotification>{

    let notification: AppNotification = new AppNotification();

    const price: number = registerOrderRequestDto.price;
    if (price <= 0) {
      notification.addError('Order price is required', null);
    }
    const Date: string = registerOrderRequestDto.purchaseDate;
    const purchaseDate:string=Date.trim();
    if (purchaseDate.length <= 0) {
      notification.addError('Order purchaseDate is required', null);
    }
    const status: string = registerOrderRequestDto.status.trim();
    if (status.length <= 0) {
      notification.addError('Order status is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;

  }

}
