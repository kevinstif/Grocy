import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderTypeORM } from "../../../../../order/infrastructure/persistence/typeorm/entities/orderTypeORM";
import { NameTypeORM } from "../../../../../../common/infrastructure/persistence/typeorm/value-objects/NameTypeORM";
import { CartSchema } from "../../../../../../shoppingcart.context/cart/infrastructure/persistence/typeorm/entities/cart.schema";
import { PriceTypeORM } from "../../../../../../common/infrastructure/persistence/typeorm/value-objects/PriceTypeORM";

@Entity('customers')
export class CustomerSchema{
  @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'id', unsigned: true})
  public id:number;

  @Column(()=>NameTypeORM,{prefix:false})
  public name:NameTypeORM;

  @Column('varchar',{name:'phone'})
  public phone:string;

  @Column('varchar',{name:'address'})
  public address:string;

  @Column(()=>PriceTypeORM,{prefix:false})
  public balance:PriceTypeORM;

  @OneToMany(()=>OrderTypeORM,(order)=>order.customer)
  public orders:OrderTypeORM[]

  @OneToMany(()=>CartSchema,(cart)=>cart.customer)
  public carts:CartSchema[]
}
