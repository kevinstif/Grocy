import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderTypeORM } from "../../infrastructure/persistence/typeorm/entities/orderTypeORM";
import { Repository } from "typeorm";
import { Order } from "../../domain/entities/order";
import { RegisterOrderRequestDto } from "../dtos/request/register-order-request.dto";
import { AppNotification } from "../../../../common/application/app.notification";

@Injectable()
export class RegisterOrderValidator{
  constructor(@InjectRepository(OrderTypeORM) private orderRepository:Repository<Order>) {}

  public async validate(registerOrderRequestDto:RegisterOrderRequestDto):Promise<AppNotification>{

    let notification: AppNotification = new AppNotification();

    const price: number = registerOrderRequestDto.price ? registerOrderRequestDto.price:0;
    if (price <= 0) {
      notification.addError('Order price is required', null);
    }
    const date: string = registerOrderRequestDto.purchaseDate;
    const purchaseDate:string= registerOrderRequestDto.purchaseDate ? registerOrderRequestDto.purchaseDate.trim():'';
    if (purchaseDate.length <= 0) {
      notification.addError('Order purchaseDate is required', null);
    }
    const status: string = registerOrderRequestDto.status ? registerOrderRequestDto.status.trim():'';
    if (status.length <= 0) {
      notification.addError('Order status is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;

  }

}
