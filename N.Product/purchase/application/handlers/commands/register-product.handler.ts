import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RegisterProductCommand } from "../../../messages/commands/register-order-command";
import { InjectRepository } from "@nestjs/typeorm";

/*
@CommandHandler(RegisterProductCommand)
export class registerProductHandler
  implements ICommandHandler<RegisterProductCommand>{
  constructor() {
    @InjectRepository()
  }
}
*/
