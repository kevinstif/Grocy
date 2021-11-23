import { Body, Controller,Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProductApplicationService } from "../application/services/product-application.service";
import { RegisterProductRequestDto } from "../application/dtos/request/register-product-request.dto";
import { EdithProductRequestDto } from "../application/dtos/request/edith-product-request.dto";

@Controller('products')
export class ProductsController {
  constructor(private readonly productService:ProductApplicationService) {}

  @Get()
  async GetAll(){
    return this.productService.GetAll();
  }

  @Get(":id")
  async  GetById(@Param('id', ParseIntPipe) id: number){
    return await this.productService.GetById(id);
  }

  @Post()
  async CreatedOrder(@Body() registerProductRequestDto:RegisterProductRequestDto){

    return await this.productService.Created(registerProductRequestDto);
  }

  @Put(":id")
  async UpdateOrder(@Param('id', ParseIntPipe) id: number,@Body() edithProductRequestDto:EdithProductRequestDto){
    return await this.productService.Update(id,edithProductRequestDto);
  }

  @Delete(":id")
  async  Delete(@Param('id', ParseIntPipe) id: number){
    return await  this.productService.Delete(id);
  }
}
