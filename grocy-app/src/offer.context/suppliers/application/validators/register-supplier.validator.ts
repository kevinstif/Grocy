import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterSupplierRequestDto } from '../dtos/request/register-supplier-request.dto';
import { Repository } from 'typeorm';
import { SupplierTypeorm } from '../../infrastructure/persistence/typeorm/entities/supplier.typeorm';

@Injectable()
export class RegisterSupplierValidator {
  constructor(
    @InjectRepository(SupplierTypeorm)
    private supplierRepository: Repository<SupplierTypeorm>,
  ) {
  }

  public async validate(
    registerSupplierRequestDto: RegisterSupplierRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerSupplierRequestDto.firstName.trim();
    if (firstName.length <= 0) {
      notification.addError('Supplier firstName is required', null);
    }
    const lastName: string = registerSupplierRequestDto.lastName.trim();
    if (lastName.length <= 0) {
      notification.addError('Supplier lastName is required', null);
    }
    const ruc: string = registerSupplierRequestDto.ruc.trim();
    if (ruc.length <= 0) {
      notification.addError('Supplier ruc is required', null);
    }
    const phone: string = registerSupplierRequestDto.phone.trim();
    if (phone.length <= 0) {
      notification.addError('Supplier phone is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const supplier: SupplierTypeorm = await this.supplierRepository.createQueryBuilder().where("ruc = :ruc", { ruc }).getOne();
    if (supplier != null) {
      notification.addError('Supplier ruc is taken', null);
    }
    return notification;
  }
}