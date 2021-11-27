import { Customer } from "../../domain/entities/customer";
import { CustomerSchema } from "../../infrastructure/persistence/typeorm/entities/customer.schema";
import { NameTypeORM } from "../../../../common/infrastructure/persistence/typeorm/value-objects/NameTypeORM";
import { PriceTypeORM } from "../../../../common/infrastructure/persistence/typeorm/value-objects/PriceTypeORM";

export class CustomerMapper {
  public static toTypeORM(customer:Customer):CustomerSchema{

    let customerTypeORM:CustomerSchema=new CustomerSchema();

    customerTypeORM.name=NameTypeORM.from(customer.getName().getFirstName(),customer.getName().getLastName());
    customerTypeORM.phone=customer.getPhone();
    customerTypeORM.address=customer.getAddress();
    customerTypeORM.balance=PriceTypeORM.from(customer.getBalance().getAmount(),customer.getBalance().getCurrency());

    return customerTypeORM;
  }
}
