import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { registerOffersRequestDto } from "../dtos/request/register-offers-request.dto";
import { Result } from "typescript-result";
import { registerOffersResponseDto } from "../dtos/response/register-offers-response.dto";
import { RegisterOfferCommand } from "../../messages/commands/register-offer-command";
import { RegisterOfferValidator } from "../validators/register-offer.validator";
import {AppNotification} from "../../../../common/application/app.notification";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";


@Injectable()
export class OfferApplicationServices {
    constructor(private commandBus:CommandBus, private registerOfferValidator:RegisterOfferValidator) {}
    async Register(registerOffersRequestDto:registerOffersRequestDto):
      Promise<Result<AppNotification, registerOffersResponseDto>>{

        const notification:AppNotification=await this.registerOfferValidator.validate(registerOffersRequestDto);
        if (notification.hasErrors()){
            return Result.error(notification);
        }

        const date=DateTime.utcNow();

        const registerOfferCommand:RegisterOfferCommand =new RegisterOfferCommand(
          registerOffersRequestDto.discountPrice,
          date,
          registerOffersRequestDto.state
        );
        const orderId=await this.commandBus.execute(registerOfferCommand);

        const registerOfferResponseDto:registerOffersResponseDto= new registerOffersResponseDto(
          orderId,
          registerOffersRequestDto.discountPrice,
          date.getDate().toString(),
          registerOffersRequestDto.state
        );
        return Result.ok(registerOfferResponseDto);
    }
}
