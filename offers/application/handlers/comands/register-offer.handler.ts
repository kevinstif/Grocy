import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterOfferCommand } from "../../../messages/commands/register-offer-command";
import { InjectRepository } from "@nestjs/typeorm";
import { OfferSchema } from "../../../infrastructure/persistence/schema/offer.schema";
import { InsertResult, Repository } from "typeorm";
import { Offer } from "../../../domain/entity/offer";
import { OfferFactory } from "../../../domain/factories/offer-factory";


@CommandHandler(RegisterOfferCommand)
export class registerOfferHandler
    implements ICommandHandler<RegisterOfferCommand>{
    constructor(
        @InjectRepository(OfferSchema)
        private offerRepository:Repository<Offer>,
        private publisher:EventPublisher,
    ) {}

    async execute(command:RegisterOfferCommand){
        const offerEntity:Offer =OfferFactory.createFrom(command.discountPrice, command.dueDate,command.state);
        const insertResult:InsertResult= await this.offerRepository.insert(offerEntity);
        const offerId:number=Number(insertResult.identifiers[0].id);
        offerEntity.changeId(offerId);
        const offer: Offer= this.publisher.mergeObjectContext(offerEntity);
        offer.register();
        offer.commit();
        return offerId;
    }
}
