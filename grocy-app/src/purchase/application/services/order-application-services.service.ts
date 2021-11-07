import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterOrderRequestDto } from "../dtos/request/register-order-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterOrderResponseDto } from "../dtos/response/register-order-response.dto";
import { RegisterOrderCommand } from "../../messages/commands/register-order-command";
import { RegisterOrderValidator } from "../validators/register-order.validator";

@Injectable()
export class OrderApplicationServices {
  constructor(private commandBus:CommandBus, private registerOrderValidator:RegisterOrderValidator) {}
  async Register(registerOrderRequestDto:RegisterOrderRequestDto):Promise<Result<AppNotification, RegisterOrderResponseDto>>{
    const notification:AppNotification=await this.registerOrderValidator.validate(registerOrderRequestDto);
    if (notification.hasErrors()){
      return Result.error(notification);
    }
    const registerOrderCommand:RegisterOrderCommand =new RegisterOrderCommand(registerOrderRequestDto.price,registerOrderRequestDto.purchaseDate,registerOrderRequestDto.status);
    const orderId=await this.commandBus.execute(registerOrderCommand);
    const registerOrderResponseDto:RegisterOrderResponseDto= new RegisterOrderResponseDto(orderId,registerOrderRequestDto.price,registerOrderRequestDto.purchaseDate,registerOrderRequestDto.status);
    return Result.ok(registerOrderResponseDto);
  }
}
