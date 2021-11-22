import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductTypeORM } from "../../infrastructure/persistence/typeorm/entities/productTypeORM";
import { Repository } from "typeorm";
import { RegisterProductRequestDto } from "../dtos/request/register-product-request.dto";
import { AppNotification } from "../../../../common/application/app.notification";

@Injectable()
export class RegisterProductValidator{
  constructor(@InjectRepository(ProductTypeORM) private productRepository:Repository<ProductTypeORM>) {}

  public async validate(registerProductRequestDto:RegisterProductRequestDto):Promise<AppNotification>{

    let notification: AppNotification= new AppNotification();

    const name:string=registerProductRequestDto.name ? registerProductRequestDto.name.trim():'';
    const type:string=registerProductRequestDto.type ? registerProductRequestDto.type.trim():'';
    const price:number=registerProductRequestDto.price ? registerProductRequestDto.price:0;
    const stock:number=registerProductRequestDto.stock ? registerProductRequestDto.stock:0;

    if(name.length<=0){
      notification.addError('name is required',null);
    }
    if(type.length<=0){
      notification.addError('type is required',null);
    }
    if(price<=0){
      notification.addError('price is required',null);
    }
    if(stock<=0){
      notification.addError('stock is required',null);
    }
    return notification
  }
}
