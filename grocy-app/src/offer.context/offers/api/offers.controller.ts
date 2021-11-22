import { Body, Controller, Post, Res } from "@nestjs/common";
import { OfferApplicationServices } from "../application/services/offer-application-services.service";
import { registerOffersRequestDto } from "../application/dtos/request/register-offers-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { registerOffersResponseDto } from "../application/dtos/response/register-offers-response.dto";
import { ApiController } from "../../common/api/api.controller";

@Controller('orders')
export class OrderController{
    constructor(private readonly orderApplicationServices:OfferApplicationServices,) {}

    @Post()
    async CreatedOrder(@Body() registerOrderRequestDto:registerOffersRequestDto, @Res({passthrough:true})response):Promise<object>{
        try {
            const result: Result<AppNotification, registerOffersResponseDto> = await this.orderApplicationServices.Register(registerOrderRequestDto);
            if (result.isSuccess()) {
                return ApiController.created(response, result.value);
            }
            return ApiController.error(response,result.error.getErrors())
        }
        catch (error){
            console.log(error);
            ApiController.serverError(response);
        }
    }
}
