import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterOfferCommand } from "../../../messages/commands/register-offer-command";
import { InjectRepository } from "@nestjs/typeorm";
import { OfferTypeORM } from "../../../infrastructure/persistence/typeorm/entities/offerTypeORM";
import { InsertResult, Repository } from "typeorm";
import { OfferFactory } from "../../../domain/factories/offer-factory";
import {Offer} from "../../../domain/entity/offer";
import { Status } from "../../../../../common/domain/Enum/Status";
import { OfferMapper } from "../../mapper/offer.mapper";
import { Money } from "../../../../../common/domain/value-objects/money.value";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../../common/application/app.notification";


@CommandHandler(RegisterOfferCommand)
export class RegisterOfferHandler
    implements ICommandHandler<RegisterOfferCommand>{
    constructor(
        @InjectRepository(OfferTypeORM)
        private offerRepository:Repository<OfferTypeORM>,
        private publisher:EventPublisher,
    ) {}

    async execute(command:RegisterOfferCommand){
        let offerId:number=0;
        let price:Money=Money.create(command.discountPrice,'Soles')
        let state:Status;

        if (command.state=='Done'){
            state=Status.Done
        }else if(command.state=='Cancel'){
            state=Status.Canceled
        }

        const offerEntity:Offer =OfferFactory.createFrom(price, command.dueDate,state);

        let offerTypeORM:OfferTypeORM=OfferMapper.toTypeORM(offerEntity);

        offerTypeORM=await this.offerRepository.save(offerTypeORM);

        if (offerTypeORM==null){
            return offerId;
        }

        offerId=offerTypeORM.id;

        offerEntity.changeId(offerId);

        const offer: Offer= this.publisher.mergeObjectContext(offerEntity);
        offer.register();
        offer.commit();
        return offerId;
    }
}
