import { Body, Controller,Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProductApplicationService } from "../application/services/product-application.service";
import { RegisterProductRequestDto } from "../application/dtos/request/register-product-request.dto";
import { EdithProductRequestDto } from "../application/dtos/request/edith-product-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterProductResponseDto } from "../application/dtos/response/register-product-response.dto";
import { ApiController } from "../../../common/api/api.controller";
import { response } from "express";
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

    try {
      const result:Result<AppNotification, RegisterProductResponseDto>= await this.productService.Created(registerProductRequestDto);
      if (result.isSuccess()){
        return ApiController.created(response,result.value)
      }
      return ApiController.error(response,result.error.getErrors())
    }catch (error){
      return ApiController.serverError(response,error);
    }
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
