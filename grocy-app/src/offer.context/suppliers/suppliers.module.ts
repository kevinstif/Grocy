import { Module } from '@nestjs/common';
import { SuppliersController } from './api/suppliers.controller';
import { SuppliersApplicationService } from './application/services/suppliers-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterSupplierValidator } from './application/validators/register-supplier.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterSupplierHandler } from './application/handlers/commands/register-supplier.handler';
import { SupplierRegisteredHandler } from './application/handlers/events/supplier-registered.handler';
import { GetSuppliersHandler } from './application/handlers/queries/get-suppliers.handler';
import { SupplierTypeorm } from './infrastructure/persistence/typeorm/entities/supplier.typeorm';
import { OffersController } from "../offers/api/offers.controller";
import { OfferApplicationServices } from "../offers/application/services/offer-application-services.service";
import { RegisterOfferValidator } from "../offers/application/validators/register-offer.validator";
import { RegisterOfferHandler } from "../offers/application/handlers/comands/register-offer.handler";
import { OfferRegisteredHandler } from "../offers/application/handlers/events/offer-registered.handle";
import { OfferTypeORM } from "../offers/infrastructure/persistence/typeorm/entities/offerTypeORM";


export const CommandHandlers = [RegisterSupplierHandler,
  RegisterOfferHandler
];
export const EventHandlers = [SupplierRegisteredHandler,OfferRegisteredHandler];
export const QueryHandlers = [GetSuppliersHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([SupplierTypeorm,OfferTypeORM])
  ],
  controllers: [
    SuppliersController,
    OffersController,
  ],
  providers: [
    SuppliersApplicationService,
    RegisterSupplierValidator,
    OfferApplicationServices,
    RegisterOfferValidator,

    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class SuppliersModule {}
