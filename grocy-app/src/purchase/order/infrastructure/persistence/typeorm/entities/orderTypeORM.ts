import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { CartSchema } from "../../../../../../shoppingcart/cart/infrastructure/persistence/typeorm/entities/cart.schema";
import { CustomerSchema } from "../../../../../customer/infrastructure/persistence/typeorm/entities/customer.schema";
import { Status } from "../../../../../../common/domain/Enum/Status";
import { PriceTypeORM } from "../../../../../../common/infrastructure/persistence/typeorm/value-objects/PriceTypeORM";

@Entity('orders')
export class OrderTypeORM{
  @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'id', unsigned: true})
  public id:number;

  @Column({name:'status',type:'enum',enum:Status,default:Status.Done})
  public status:Status;

  @Column(()=>PriceTypeORM,{prefix:false})
  public price:PriceTypeORM;

  @Column('datetime',{name:'purchase_date'})
  public purchaseDate:string;

  @ManyToOne(()=>CartSchema,(cart)=>cart.order)
  @JoinColumn({name:'cart_id'})
  public Cart:CartSchema;

  @ManyToOne(()=>CustomerSchema,(customer)=>customer.orders)
  @JoinColumn({name:'customer_id'})
  public customer:CustomerSchema;
}
