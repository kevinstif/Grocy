import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { CartApplicationServices } from "../application/services/cart-application-services.service";
import { RegisterCartRequestDto } from "../application/dtos/request/register-cart-request.dto";
import { EditCartRequestDto } from "../application/dtos/request/edit-cart-request.dto";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Shopping Carts')
@Controller('shoppingCarts')
export class CartController {
  constructor(private readonly cartApplicationServices:CartApplicationServices,) {}

  @Get()
  @ApiOperation({ summary: 'All Shopping Carts' })
  async GetAll(){
    return this.cartApplicationServices.GetAll();
  }

  @Get(":id")
  @ApiOperation({ summary: 'Find shopping cart by Id' })
  async  GetById(@Param('id', ParseIntPipe) id: number){
    return await this.cartApplicationServices.GetById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create shopping cart' })
  async CreatedCart(@Body() registerCartRequestDto:RegisterCartRequestDto){

      return await this.cartApplicationServices.Create(registerCartRequestDto);
  }

  @Put(":id")
  @ApiOperation({ summary: 'Update shopping cart by Id' })
  async UpdateCart(@Param('id', ParseIntPipe) id: number,@Body() editCartRequestDto:EditCartRequestDto){
    return await this.cartApplicationServices.Update(id,editCartRequestDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Delete shopping cart by Id' })
  async  Delete(@Param('id', ParseIntPipe) id: number){
    return await  this.cartApplicationServices.Delete(id);
  }
}
