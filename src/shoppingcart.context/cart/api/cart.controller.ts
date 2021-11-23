import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { CartApplicationServices } from "../application/services/cart-application-services.service";
import { RegisterCartRequestDto } from "../application/dtos/request/register-cart-request.dto";
import { EditCartRequestDto } from "../application/dtos/request/edit-cart-request.dto";

@Controller('shoppingCarts')
export class CartController {
  constructor(private readonly cartApplicationServices:CartApplicationServices,) {}

  @Get()
  async GetAll(){
    return this.cartApplicationServices.GetAll();
  }

  @Get(":id")
  async  GetById(@Param('id', ParseIntPipe) id: number){
    return await this.cartApplicationServices.GetById(id);
  }

  @Post()
  async CreatedCart(@Body() registerCartRequestDto:RegisterCartRequestDto){

      return await this.cartApplicationServices.Create(registerCartRequestDto);
  }

  @Put(":id")
  async UpdateCart(@Param('id', ParseIntPipe) id: number,@Body() editCartRequestDto:EditCartRequestDto){
    return await this.cartApplicationServices.Update(id,editCartRequestDto);
  }

  @Delete(":id")
  async  Delete(@Param('id', ParseIntPipe) id: number){
    return await  this.cartApplicationServices.Delete(id);
  }
}
