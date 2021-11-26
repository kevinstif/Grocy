import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterCartCommand } from "../../../messages/commands/register-cart-command";
import { InjectRepository } from "@nestjs/typeorm";
import { CartSchema } from "../../../infrastructure/persistence/typeorm/entities/cart.schema";
import { InsertResult, Repository } from "typeorm";
import { CartFactory } from "../../../domain/factories/cart-factory";
import { Cart } from "../../../domain/entities/cart";
import { CartMapper } from "../../mapper/cart.mapper";

@CommandHandler(RegisterCartCommand)
export class RegisterCartHandler
  implements ICommandHandler<RegisterCartCommand>{
  constructor(
    @InjectRepository(CartSchema)
    private cartRepository:Repository<CartSchema>,
    private publisher:EventPublisher,
  ) {}

  async execute(command:RegisterCartCommand){
    let cartId:number=0;
    const cart: Cart = CartFactory.createFrom(
      command.customerId,
      command.quantity,
      command.creationDate,
      command.state
    );

    let cartTyORM:CartSchema=CartMapper.toTypeORM(cart);

    cartTyORM=await this.cartRepository.save(cartTyORM);

    if (cartTyORM==null){
      return cartId;
    }

    cartId=cartTyORM.id;

    cart.changeId(cartId);

    return cartId;
  }
}

