import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { CustomerApplicationServices } from "../application/services/customer-application-services.service";
import { RegisterCustomerRequestDto } from "../application/dtos/request/register-customer-request.dto";
import { EditCustomerRequestDto } from "../application/dtos/request/edit-customer-request.dto";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerApplicationServices:CustomerApplicationServices,) {}

  @Get()
  @ApiOperation({ summary: 'All Customers' })
  async GetAll(){
    return this.customerApplicationServices.GetAll();
  }

  @Get(":id")
  @ApiOperation({ summary: 'Find customer by Id' })
  async  GetById(@Param('id', ParseIntPipe) id: number){
    return await this.customerApplicationServices.GetById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create customer' })
  async CreatedCustomer(@Body() registerCustomerRequestDto:RegisterCustomerRequestDto){

      return await this.customerApplicationServices.Create(registerCustomerRequestDto);
  }

  @Put(":id")
  @ApiOperation({ summary: 'Update customer by Id' })
  async UpdateCustomer(@Param('id', ParseIntPipe) id: number,@Body() editCustomerRequestDto:EditCustomerRequestDto){
    return await this.customerApplicationServices.Update(id,editCustomerRequestDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Delete customer by Id' })
  async  Delete(@Param('id', ParseIntPipe) id: number){
    return await  this.customerApplicationServices.Delete(id);
  }
}
