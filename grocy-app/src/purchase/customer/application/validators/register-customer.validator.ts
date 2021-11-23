import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerSchema } from "../../infrastructure/persistence/typeorm/entities/customer.schema";
import { Repository } from "typeorm";
import { Customer } from "../../domain/entities/customer";
import { RegisterCustomerRequestDto } from "../dtos/request/register-customer-request.dto";
import { AppNotification } from "../../../../common/application/app.notification";

@Injectable()
export class RegisterCustomerValidator {
  constructor(@InjectRepository(CustomerSchema) private customerRepository:Repository<Customer>) {}

  public async validate(registerCustomerRequestDto:RegisterCustomerRequestDto):Promise<AppNotification>{

    let notification: AppNotification = new AppNotification();

    const firstName:string=registerCustomerRequestDto.firstName ? registerCustomerRequestDto.firstName.trim():'';
    const lastName:string=registerCustomerRequestDto.lastName ? registerCustomerRequestDto.lastName.trim():'';
    const phone:string=registerCustomerRequestDto.phone ? registerCustomerRequestDto.phone.trim():'';
    const address:string=registerCustomerRequestDto.address ? registerCustomerRequestDto.address.trim():'';

    if(firstName.length<=0){
      notification.addError('first name is required',null);
    }
    if(lastName.length<=0){
      notification.addError('last name is required',null);
    }
    if(phone.length<=0){
      notification.addError('phone is required',null);
    }
    if(address.length<=0){
      notification.addError('address is required',null);
    }
    return notification
  }

}
