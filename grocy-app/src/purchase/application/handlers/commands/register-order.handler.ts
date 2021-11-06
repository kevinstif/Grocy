import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RegisterOrderCommand } from "../../../messages/commands/register-order-command";
import { InjectRepository } from "@nestjs/typeorm";

/*
@CommandHandler(RegisterOrderCommand)
export class registerOrderHandler
  implements ICommandHandler<RegisterOrderCommand>{
  constructor() {
    @InjectRepository()
  }
}
*/
