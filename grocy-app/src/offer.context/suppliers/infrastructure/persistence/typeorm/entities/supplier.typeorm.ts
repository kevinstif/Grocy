import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { SupplierIdTypeorm } from './supplier.id.typeorm';
import { NameTypeORM } from '../../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { RucTypeORM } from "../../../../../../common/infrastructure/persistence/typeorm/entities/ruc.typeorm";
import { PhoneTypeORM } from "../../../../../../common/infrastructure/persistence/typeorm/entities/phone.typeorm";
import { ProductTypeORM } from "../../../../../../purchase/product/infrastructure/persistence/typeorm/entities/productTypeORM";


@Entity('suppliers')
@Unique('UQ_customers_ruc', ['ruc.value'])
export class SupplierTypeorm {
  @Column((type) => SupplierIdTypeorm, { prefix: false })
  public id: SupplierIdTypeorm;

  @Column((type) => NameTypeORM, { prefix: false })
  public name: NameTypeORM;

  @Column((type) => RucTypeORM, { prefix: false })
  public ruc: RucTypeORM;

  @Column((type) => PhoneTypeORM, { prefix: false })
  public phone: PhoneTypeORM;

  @ManyToMany(()=>ProductTypeORM,(products)=>products.suppliers)
  @JoinTable(
    {
      name:'product_supplier',
      joinColumn:{
        name:'supplier_id'
      },
      inverseJoinColumn:{
        name:'product_id'
      }
    }
  )
  public products:ProductTypeORM[];
}
