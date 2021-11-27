import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { OrderApplicationServices } from "../application/services/order-application-services.service";
import { RegisterOrderRequestDto } from "../application/dtos/request/register-order-request.dto";
import { EdithOrderRequestDto } from "../application/dtos/request/edith-order-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterOrderResponseDto } from "../application/dtos/response/register-order-response.dto";
import { ApiController } from "../../../common/api/api.controller";
import { response } from "express";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController{
  constructor(private readonly orderApplicationServices:OrderApplicationServices,) {}

  @Get()
  @ApiOperation({ summary: 'All orders' })
  async GetAll(){
    return this.orderApplicationServices.GetAll();
  }

  @Get(":id")
  @ApiOperation({ summary: 'Find order by Id' })
  async  GetById(@Param('id', ParseIntPipe) id: number){
    return await this.orderApplicationServices.GetById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create order' })
  async CreatedOrder(@Body() registerOrderRequestDto:RegisterOrderRequestDto){

     try {
       const result:Result<AppNotification, RegisterOrderResponseDto>= await this.orderApplicationServices.Create(registerOrderRequestDto);
       if (result.isSuccess()){
         return ApiController.created(response,result.value);
       }
       return ApiController.error(response, result.error.getErrors());
     }catch (error){
       return ApiController.serverError(response,error);
     }
  }

  @Put(":id")
  @ApiOperation({ summary: 'Update order by Id' })
  async UpdateOrder(@Param('id', ParseIntPipe) id: number,@Body() edithOrderRequestDto:EdithOrderRequestDto){
    return await this.orderApplicationServices.Update(id,edithOrderRequestDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Delete order by Id' })
  async  Delete(@Param('id', ParseIntPipe) id: number){
    return await  this.orderApplicationServices.Delete(id);
  }
}
