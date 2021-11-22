import { Injectable } from "@nestjs/common";
import { RegisterProductValidator } from "../validators/register-product.validator";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductTypeORM } from "../../infrastructure/persistence/typeorm/entities/productTypeORM";
import { Repository } from "typeorm";
import { RegisterProductRequestDto } from "../dtos/request/register-product-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { RegisterProductResponseDto } from "../dtos/response/register-product-response.dto";

@Injectable()
export class ProductApplicationService{

  constructor(
    private validator:RegisterProductValidator,
    @InjectRepository(ProductTypeORM)
    private readonly productRepository:Repository<ProductTypeORM>
  ) {}

  async GetAll(){
    return this.productRepository.find();
  }

  async GetById(id: number){
    return this.productRepository.findOne(id);
  }

  async Created(registerProductRequestDto:RegisterProductRequestDto)
  :Promise<Result<AppNotification, RegisterProductResponseDto>>{

    const notification:AppNotification=await this.validator.validate(registerProductRequestDto);

    if (notification.hasErrors()){
      return Result.error(notification);
    }

    const insertResult=await this.productRepository.insert(registerProductRequestDto as any);

    const productId:number=Number(insertResult.identifiers[0].id);

    const response:RegisterProductResponseDto=new RegisterProductResponseDto(
      productId,
      registerProductRequestDto.name,
      registerProductRequestDto.type,
      registerProductRequestDto.price,
      registerProductRequestDto.stock
    )

    return Result.ok(response);
  }
}
