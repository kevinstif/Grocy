import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartSchema } from "../../infrastructure/persistence/typeorm/entities/cart.schema";
import { Repository } from "typeorm";
import { Cart } from "../../domain/entities/cart";
import { RegisterCartRequestDto } from "../dtos/request/register-cart-request.dto";
import { AppNotification } from "../../../../common/application/app.notification";

@Injectable()
export class RegisterCartValidator {
  constructor(@InjectRepository(CartSchema) private cartRepository:Repository<Cart>) {}

  public async validate(registerCartRequestDto:RegisterCartRequestDto):Promise<AppNotification>{

    let notification: AppNotification = new AppNotification();

    const customerId: number = registerCartRequestDto.customerId ? registerCartRequestDto.customerId:0;
    if (customerId <= 0) {
      notification.addError('Cart customerId does is required', null);
    }
    const quantity: number = registerCartRequestDto.quantity ? registerCartRequestDto.quantity:0;
    if (quantity <= 0) {
      notification.addError('Cart quantity is required', null);
    }
    const state: string = registerCartRequestDto.state ? registerCartRequestDto.state.trim():'';
    if (state.length <= 0) {
      notification.addError('Cart state is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;

  }

}
