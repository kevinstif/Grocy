import {
  Column,
  Entity,
  EntitySchema,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { OrderTypeORM } from "../../../../../../purchase/order/infrastructure/persistence/typeorm/entities/orderTypeORM";
import { ProductTypeORM } from "../../../../../../purchase/product/infrastructure/persistence/typeorm/entities/productTypeORM";
import { CustomerSchema } from "../../../../../../purchase/customer/infrastructure/persistence/typeorm/entities/customer.schema";
import { PriceTypeORM } from "../../../../../../common/infrastructure/persistence/typeorm/value-objects/PriceTypeORM";

@Entity('cart')
export class CartSchema{

  @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'id', unsigned: true})
  public id:number;

  @Column('varchar',{name:'state'})
  public state:string;

  @Column('int',{name:'quantity'})
  public quantity:number;

  @Column('varchar',{name:'creation_date'})
  public creationDate:string;

  @Column(()=>PriceTypeORM,{prefix:false})
  public price:PriceTypeORM;

  @OneToMany(()=>OrderTypeORM,(order)=>order.Cart)
  public order:OrderTypeORM[]

  @ManyToMany(()=>ProductTypeORM,(product)=>product.carts)
  public products:ProductTypeORM[];

  @ManyToOne(()=>CustomerSchema,(customer)=>customer.carts)
  @JoinColumn({name:'customer_id'})
  public customer:CustomerSchema;
}
