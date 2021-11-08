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

export const CommandHandlers = [RegisterSupplierHandler];
export const EventHandlers = [SupplierRegisteredHandler];
export const QueryHandlers = [GetSuppliersHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([SupplierTypeorm]),
  ],
  controllers: [SuppliersController],
  providers: [
    SuppliersApplicationService,
    RegisterSupplierValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class SuppliersModule {}