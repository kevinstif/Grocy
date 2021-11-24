import { Injectable, NotFoundException } from "@nestjs/common";
import { RegisterProductValidator } from "../validators/register-product.validator";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductTypeORM } from "../../infrastructure/persistence/typeorm/entities/productTypeORM";
import { Repository } from "typeorm";
import { RegisterProductRequestDto } from "../dtos/request/register-product-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { RegisterProductResponseDto } from "../dtos/response/register-product-response.dto";
import { EdithProductRequestDto } from "../dtos/request/edith-product-request.dto";
import { RegisterProductCommand } from "../../messages/commands/register-product.command";
import { CommandBus } from "@nestjs/cqrs";

@Injectable()
export class ProductApplicationService{

  constructor(
    private validator:RegisterProductValidator,
    private commandBus:CommandBus,
    @InjectRepository(ProductTypeORM)
    private readonly productRepository:Repository<ProductTypeORM>
  ) {}

  async GetAll(){
    return this.productRepository.find();
  }

  async GetById(id: number){
    const product= await this.productRepository.findOne(id);
    if(!product) throw new NotFoundException('Product does not exist');
    return product;
  }

  async Created(registerProductRequestDto:RegisterProductRequestDto)
  :Promise<Result<AppNotification, RegisterProductResponseDto>>{

    const notification:AppNotification=await this.validator.validate(registerProductRequestDto);

    if (notification.hasErrors()){
      return Result.error(notification);
    }

    const registerProductCommand=new RegisterProductCommand(
      registerProductRequestDto.name,
      registerProductRequestDto.type,
      registerProductRequestDto.price,
      registerProductRequestDto.stock
    )

    const productId= await this.commandBus.execute(registerProductCommand);

    const response:RegisterProductResponseDto=new RegisterProductResponseDto(
      productId,
      registerProductRequestDto.name,
      registerProductRequestDto.type,
      registerProductRequestDto.price,
      registerProductRequestDto.stock
    )

    return Result.ok(response);
  }

  async Update(id: number,edithProductRequestDto:EdithProductRequestDto){
    const product= await this.productRepository.findOne(id);
    if(!product) throw new NotFoundException('product does not exist');
    const editedProduct=Object.assign(product,edithProductRequestDto);
    return this.productRepository.save(editedProduct);
  }

  async Delete(id: number){
    const product= await this.productRepository.findOne(id);
    if(!product) throw new NotFoundException('Post does not exist');
    return this.productRepository.delete(id);
  }
}
