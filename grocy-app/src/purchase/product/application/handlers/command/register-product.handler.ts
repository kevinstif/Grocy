import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterProductCommand } from "../../../messages/commands/register-product.command";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductTypeORM } from "../../../infrastructure/persistence/typeorm/entities/productTypeORM";
import { Repository } from "typeorm";
import { Product } from "../../../domain/entities/product";
import { ProductFactory } from "../../../domain/factories/product.factory";
import { ProductMapper } from "../../mapper/product.mapper";
import { TypeProduct } from "../../../domain/enums/type-product";
import { Money } from "../../../../../common/domain/value-objects/money.value";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../../common/application/app.notification";

@CommandHandler(RegisterProductCommand)
export class RegisterProductHandler implements ICommandHandler<RegisterProductCommand>{
  constructor(
    @InjectRepository(ProductTypeORM)
    private productRepository:Repository<ProductTypeORM>,
    private publisher:EventPublisher
  ) {}

  async execute(command: RegisterProductCommand){
    let productId:number=0;
    let type:TypeProduct;
    let price:Money=Money.create(command.price,'Soles');

    if (command.type=='P'){
      type=TypeProduct.package
    }else if (command.type=='E'){
      type=TypeProduct.Expire
    }else {
      return productId;
    }
    let product:Product=ProductFactory.createFrom(command.name,type,price,command.stock)

    let productTypeORM:ProductTypeORM=ProductMapper.toTypeORM(product);

    productTypeORM=await this.productRepository.save(productTypeORM);

    if (productTypeORM==null){
      return productId
    }

    productId=productTypeORM.id;

    product.changeId(productId)

    return productId;
  }



}
