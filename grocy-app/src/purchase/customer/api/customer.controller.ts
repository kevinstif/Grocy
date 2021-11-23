import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { CustomerApplicationServices } from "../application/services/customer-application-services.service";
import { RegisterCustomerRequestDto } from "../application/dtos/request/register-customer-request.dto";
import { EditCustomerRequestDto } from "../application/dtos/request/edit-customer-request.dto";

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

      return await this.customerApplicationServices.Create(registerCustomerRequestDto);
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
