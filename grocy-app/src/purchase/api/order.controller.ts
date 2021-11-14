import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { OrderApplicationServices } from "../application/services/order-application-services.service";
import { RegisterOrderRequestDto } from "../application/dtos/request/register-order-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterOrderResponseDto } from "../application/dtos/response/register-order-response.dto";
import { ApiController } from "../../common/api/api.controller";
import { EdithOrderRequestDto } from "../application/dtos/request/edith-order-request.dto";

@Controller('orders')
export class OrderController{
  constructor(private readonly orderApplicationServices:OrderApplicationServices,) {}

  @Get()
  async GetAll(){
    return this.orderApplicationServices.GetAll();
  }

  @Get(":id")
  async  GetById(@Param('id', ParseIntPipe) id: number){
    return await this.orderApplicationServices.GetById(id);
  }

  @Post()
  async CreatedOrder(@Body() registerOrderRequestDto:RegisterOrderRequestDto){

      return await this.orderApplicationServices.Create(registerOrderRequestDto);
  }

  @Put(":id")
  async UpdateOrder(@Param('id', ParseIntPipe) id: number,@Body() edithOrderRequestDto:EdithOrderRequestDto){
    return await this.orderApplicationServices.Update(id,edithOrderRequestDto);
  }

  @Delete(":id")
  async  Delete(@Param('id', ParseIntPipe) id: number){
    return await  this.orderApplicationServices.Delete(id);
  }
}
