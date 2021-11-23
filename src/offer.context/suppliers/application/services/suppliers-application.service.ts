import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterSupplierRequestDto } from '../dtos/request/register-supplier-request.dto';
import { RegisterSupplierCommand } from '../commands/register-supplier.command';
import { RegisterSupplierResponseDto } from '../dtos/response/register-supplier-response.dto';
import { RegisterSupplierValidator } from '../validators/register-supplier.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';

@Injectable()
export class SuppliersApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerSupplierValidator: RegisterSupplierValidator,
  ) {}

  async register(
    registerSupplierRequestDto: RegisterSupplierRequestDto,
  ): Promise<Result<AppNotification, RegisterSupplierResponseDto>> {
    const notification: AppNotification = await this.registerSupplierValidator.validate(
      registerSupplierRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerSupplierCommand: RegisterSupplierCommand = new RegisterSupplierCommand(
      registerSupplierRequestDto.firstName,
      registerSupplierRequestDto.lastName,
      registerSupplierRequestDto.ruc,
      registerSupplierRequestDto.phone,
    );
    const supplierId = await this.commandBus.execute(registerSupplierCommand);
    const registerSupplierResponseDto: RegisterSupplierResponseDto = new RegisterSupplierResponseDto(
      supplierId,
      registerSupplierRequestDto.firstName,
      registerSupplierRequestDto.lastName,
      registerSupplierRequestDto.ruc,
      registerSupplierRequestDto.phone,
    );
    return Result.ok(registerSupplierResponseDto);
  }
}