import { Column, Entity, EntitySchema, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderTypeORM } from "../../../../../order/infrastructure/persistence/typeorm/entities/orderTypeORM";
import { CartSchema } from "../../../../../../shoppingcart/cart/infrastructure/persistence/typeorm/entities/cart.schema";

@Entity('customers')
export class CustomerSchema{
  @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'id', unsigned: true})
  public id:number;

  @Column('varchar',{name:'first_name'})
  public firstName:string;

  @Column('varchar',{name:'last_name'})
  public lastName:string;

  @Column('bigint',{name:'phone'})
  public phone:number;

  @Column('varchar',{name:'address'})
  public address:string;

  @OneToMany(()=>OrderTypeORM,(order)=>order.customer)
  public orders:OrderTypeORM[]

  @OneToMany(()=>CartSchema,(cart)=>cart.customer)
  public carts:CartSchema[]
}
