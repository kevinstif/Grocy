import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { OrderApplicationServices } from "../application/services/order-application-services.service";
import { RegisterOrderRequestDto } from "../application/dtos/request/register-order-request.dto";
import { EdithOrderRequestDto } from "../application/dtos/request/edith-order-request.dto";
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

      return await this.orderApplicationServices.Create(registerOrderRequestDto);
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
