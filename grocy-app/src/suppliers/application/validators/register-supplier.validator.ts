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
    const dni: string = registerSupplierRequestDto.dni.trim();
    if (dni.length <= 0) {
      notification.addError('Supplier ruc is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const supplier: SupplierTypeorm = await this.supplierRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    if (supplier != null) {
      notification.addError('Supplier ruc is taken', null);
    }
    return notification;
  }
}