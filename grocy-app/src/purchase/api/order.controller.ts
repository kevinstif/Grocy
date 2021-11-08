import { Body, Controller, Post, Res } from "@nestjs/common";
import { OrderApplicationServices } from "../application/services/order-application-services.service";
import { RegisterOrderRequestDto } from "../application/dtos/request/register-order-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterOrderResponseDto } from "../application/dtos/response/register-order-response.dto";
import { ApiController } from "../../common/api/api.controller";

@Controller('orders')
export class OrderController{
  constructor(private readonly orderApplicationServices:OrderApplicationServices,) {}

  @Post()
  async CreatedOrder(@Body() registerOrderRequestDto:RegisterOrderRequestDto, @Res({passthrough:true})response):Promise<object>{

    console.log("controller funciona");

    try {
      const result: Result<AppNotification, RegisterOrderResponseDto> = await this.orderApplicationServices.Register(registerOrderRequestDto);
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