import { Module } from '@nestjs/common';
import { OffersController } from './api/offers.controller';
import { OfferApplicationServices } from './application/services/offer-application-services.service';
import { registerOfferHandler } from './application/handlers/comands/register-offer.handler';
import { OfferRegisteredHandler } from './application/handlers/events/offer-registered.handle';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferSchema } from "./infrastructure/persistence/schema/offer.schema";
import { RegisterOfferValidator } from './application/validators/register-offer.validator';

export const CommandHandlers=[registerOfferHandler]
export const EventHandlers=[OfferRegisteredHandler]


@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([OfferSchema])
    ],
    controllers:[OffersController],
    providers:[
        OfferApplicationServices,
        RegisterOfferValidator,
        ...CommandHandlers,
        ...EventHandlers,
    ],
})
export class OffersModule{}