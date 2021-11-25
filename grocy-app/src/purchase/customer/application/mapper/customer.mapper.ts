import { Customer } from "../../domain/entities/customer";
import { CustomerSchema } from "../../infrastructure/persistence/typeorm/entities/customer.schema";
import { NameTypeORM } from "../../../../common/infrastructure/persistence/typeorm/value-objects/NameTypeORM";

export class CustomerMapper {
  public static toTypeORM(customer:Customer):CustomerSchema{

    let customerTypeORM:CustomerSchema=new CustomerSchema();

    customerTypeORM.name=NameTypeORM.from(customer.getName().getFirstName(),customer.getName().getLastName());
    customerTypeORM.phone=customer.getPhone();
    customerTypeORM.address=customer.getAddress();

    return customerTypeORM;
  }
}
