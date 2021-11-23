import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/offer.context/suppliers/domain/entities/supplier.entity';
import { RegisterSupplierCommand } from 'src/offer.context/suppliers/application/commands/register-supplier.command';
import { Repository } from 'typeorm';
import { SupplierFactory } from '../../../domain/factories/supplier.factory';
import { SupplierId } from '../../../domain/value-objects/supplier-id.value';
import { Ruc } from '../../../domain/value-objects/ruc.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../../common/application/app.notification';
import { SupplierTypeorm } from '../../../infrastructure/persistence/typeorm/entities/supplier.typeorm';
import { Name } from '../../../../../common/domain/value-objects/name.value';
import { SupplierMapper } from '../../mappers/supplier.mapper';
import { Phone } from "../../../domain/value-objects/phone.value";

@CommandHandler(RegisterSupplierCommand)
export class RegisterSupplierHandler
  implements ICommandHandler<RegisterSupplierCommand> {
  constructor(
    @InjectRepository(SupplierTypeorm)
    private supplierRepository: Repository<SupplierTypeorm>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterSupplierCommand) {
    const rucResult: Result<AppNotification, Ruc> = Ruc.create(command.ruc);
    if (rucResult.isFailure()) {
      return 0;
    }
    const phoneResult: Result<AppNotification, Phone> = Phone.create(command.phone);
    if (phoneResult.isFailure()) {
      return 0;
    }
    const nameResult: Result<AppNotification, Name> = Name.create(command.firstName, command.lastName);
    if (nameResult.isFailure()) {
      return 0;
    }
    let supplier: Supplier = SupplierFactory.createFrom(nameResult.value, rucResult.value, phoneResult.value);
    let supplierTypeORM = SupplierMapper.toTypeORM(supplier);
    supplierTypeORM = await this.supplierRepository.save(supplierTypeORM);
    if (supplierTypeORM == null) {
      return 0;
    }
    const supplierId:number = Number(supplierTypeORM.id.value);
    supplier.changeId(SupplierId.create(supplierId));
    supplier = this.publisher.mergeObjectContext(supplier);
    supplier.register();
    supplier.commit();
    return supplierId;
  }
}
