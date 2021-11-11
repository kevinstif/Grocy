import { GetSuppliersQuery } from '../../queries/get-suppliers.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetSuppliersDto } from '../../dtos/queries/get-suppliers.dto';

@QueryHandler(GetSuppliersQuery)
export class GetSuppliersHandler implements IQueryHandler<GetSuppliersQuery> {
  constructor() {}

  async execute(query: GetSuppliersQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      phone,
      dni
    FROM 
      suppliers
    ORDER BY
      last_name, first_name;`;
    const ormSuppliers = await manager.query(sql);
    if (ormSuppliers.length <= 0) {
      return [];
    }
    const suppliers: GetSuppliersDto[] = ormSuppliers.map(function (ormSupplier) {
      let supplierDto = new GetSuppliersDto();
      supplierDto.id = Number(ormSupplier.id);
      supplierDto.firstName = ormSupplier.firstName;
      supplierDto.lastName = ormSupplier.lastName;
      supplierDto.phone = ormSupplier.phone;
      supplierDto.dni = ormSupplier.dni;
      return supplierDto;
    });
    return suppliers;
  }
}