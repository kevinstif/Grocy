import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { CustomerApplicationServices } from "../application/services/customer-application-services.service";
import { RegisterCustomerRequestDto } from "../application/dtos/request/register-customer-request.dto";
import { EditCustomerRequestDto } from "../application/dtos/request/edit-customer-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterCustomerResponseDto } from "../application/dtos/response/register-customer-response.dto";
import { ApiController } from "../../../common/api/api.controller";
import { response } from "express";

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerApplicationServices:CustomerApplicationServices,) {}

  @Get()
  async GetAll(){
    return this.customerApplicationServices.GetAll();
  }

  @Get(":id")
  async  GetById(@Param('id', ParseIntPipe) id: number){
    return await this.customerApplicationServices.GetById(id);
  }

  @Post()
  async CreatedCustomer(@Body() registerCustomerRequestDto:RegisterCustomerRequestDto){

      try {
        const result:Result<AppNotification, RegisterCustomerResponseDto>= await this.customerApplicationServices.Create(registerCustomerRequestDto);
        if (result.isSuccess()){
          return ApiController.created(response,result.value);
        }
        return  ApiController.error(response,result.error.getErrors())
      }catch (error){
        return ApiController.serverError(response,error);
      }
  }

  @Put(":id")
  async UpdateCustomer(@Param('id', ParseIntPipe) id: number,@Body() editCustomerRequestDto:EditCustomerRequestDto){
    return await this.customerApplicationServices.Update(id,editCustomerRequestDto);
  }

  @Delete(":id")
  async  Delete(@Param('id', ParseIntPipe) id: number){
    return await  this.customerApplicationServices.Delete(id);
  }
}
