import { Body, Controller,Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProductApplicationService } from "../application/services/product-application.service";
import { RegisterProductRequestDto } from "../application/dtos/request/register-product-request.dto";
import { EdithProductRequestDto } from "../application/dtos/request/edith-product-request.dto";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService:ProductApplicationService) {}

  @Get()
  @ApiOperation({ summary: 'All Products' })
  async GetAll(){
    return this.productService.GetAll();
  }

  @Get(":id")
  @ApiOperation({ summary: 'Find product by Id' })
  async  GetById(@Param('id', ParseIntPipe) id: number){
    return await this.productService.GetById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  async CreatedOrder(@Body() registerProductRequestDto:RegisterProductRequestDto){

    return await this.productService.Created(registerProductRequestDto);
  }

  @Put(":id")
  @ApiOperation({ summary: 'Update product by Id' })
  async UpdateOrder(@Param('id', ParseIntPipe) id: number,@Body() edithProductRequestDto:EdithProductRequestDto){
    return await this.productService.Update(id,edithProductRequestDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Delete order by Id' })
  async  Delete(@Param('id', ParseIntPipe) id: number){
    return await  this.productService.Delete(id);
  }
}
