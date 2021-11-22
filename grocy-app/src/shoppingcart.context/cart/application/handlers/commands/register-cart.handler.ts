import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterCartCommand } from "../../../messages/commands/register-cart-command";
import { InjectRepository } from "@nestjs/typeorm";
import { CartSchema } from "../../../infrastructure/persistence/typeorm/entities/cart.schema";
import { InsertResult, Repository } from "typeorm";
import { Cart } from "../../../domain/entities/cart";
import { CartFactory } from "../../../domain/factories/cart-factory";


@CommandHandler(RegisterCartCommand)
export class RegisterCartHandler
  implements ICommandHandler<RegisterCartCommand>{
  constructor(
    @InjectRepository(CartSchema)
    private cartRepository:Repository<Cart>,
    private publisher:EventPublisher,
  ) {}

  async execute(command:RegisterCartCommand){
    const cartEntity: Cart = CartFactory.createFrom(command.customerId, command.productId, command.quantity, command.creationDate, command.state);
    console.log(cartEntity);
    const insertResult:InsertResult= await this.cartRepository.insert(cartEntity as any);
    console.log(insertResult);
    const cartId:number=Number(insertResult.identifiers[0].id);
    cartEntity.changeId(cartId);
    const cart: Cart = this.publisher.mergeObjectContext(cartEntity);
    cart.register();
    cart.commit();
    return cartId;
  }
}

