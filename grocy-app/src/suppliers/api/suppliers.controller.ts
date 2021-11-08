import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterSupplierRequestDto } from '../application/dtos/request/register-supplier-request.dto';
import { RegisterSupplierResponseDto } from '../application/dtos/response/register-supplier-response.dto';
import { SuppliersApplicationService } from '../application/services/suppliers-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetSuppliersQuery } from '../application/queries/get-suppliers.query';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersApplicationService: SuppliersApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerSupplierRequestDto: RegisterSupplierRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterSupplierResponseDto> = await this.suppliersApplicationService.register(registerSupplierRequestDto);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getSuppliers(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const suppliers = await this.queryBus.execute(new GetSuppliersQuery());
      return ApiController.ok(response, suppliers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}