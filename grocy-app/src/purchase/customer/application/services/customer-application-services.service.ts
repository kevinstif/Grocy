import { Injectable, NotFoundException } from "@nestjs/common";
import { RegisterCustomerRequestDto } from "../dtos/request/register-customer-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { RegisterCustomerResponseDto } from "../dtos/response/register-customer-response.dto";
import { RegisterCustomerValidator } from "../validators/register-customer.validator";
import { CommandBus } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { CustomerSchema } from "../../infrastructure/persistence/typeorm/entities/customer.schema";
import { InjectRepository } from "@nestjs/typeorm";
import { EditCustomerRequestDto } from "../dtos/request/edit-customer-request.dto";
import { Customer } from "../../domain/entities/customer";
import { RegisterCustomerCommand } from "../../messages/commands/register-customer-command";

@Injectable()
export class CustomerApplicationServices {

  constructor(
    private commandBus:CommandBus,
    private registerCustomerValidator:RegisterCustomerValidator,
    @InjectRepository(CustomerSchema)
    private readonly customerRepository:Repository<Customer>,
  ) {}

  async GetAll(){
    return await this.customerRepository.find();
  }

  async GetById(id: number){

   const customer = await this.customerRepository.findOne(id);
   if(!customer) throw new NotFoundException('Not found');
   return customer;
  }

  async Create(registerCustomerRequestDto:RegisterCustomerRequestDto):Promise<Result<AppNotification, RegisterCustomerResponseDto>>{
    const notification:AppNotification=await this.registerCustomerValidator.validate(registerCustomerRequestDto);

    if (notification.hasErrors()){
      return Result.error(notification);
    }

    const customerCommand= new RegisterCustomerCommand(
      registerCustomerRequestDto.firstName,
      registerCustomerRequestDto.lastName,
      registerCustomerRequestDto.phone,
      registerCustomerRequestDto.address,
      registerCustomerRequestDto.balance
    )

    const customerId=await this.commandBus.execute(customerCommand);

    const registerCustomerResponseDto:RegisterCustomerResponseDto= new RegisterCustomerResponseDto(
      customerId,
      registerCustomerRequestDto.firstName,
      registerCustomerRequestDto.lastName,
      registerCustomerRequestDto.phone,
      registerCustomerRequestDto.address,
      registerCustomerRequestDto.balance
    );
    return Result.ok(registerCustomerResponseDto);
  }
  async Update(id: number,editCustomerRequestDto:EditCustomerRequestDto){
    const customer = await this.customerRepository.findOne(id);
    if(!customer) throw new NotFoundException('Customer does not exist');
    const editedCustomer=Object.assign(customer,editCustomerRequestDto);
    return this.customerRepository.save(editedCustomer);
  }
  async Delete(id: number){
    const customer = await this.customerRepository.findOne(id);
    if(!customer) throw new NotFoundException('Customer does not exist');
    return this.customerRepository.delete(id);
  }
}
