import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Cart } from "../../../../../../shoppingcart.context/cart/domain/entities/cart";
import { CartSchema } from "../../../../../../shoppingcart.context/cart/infrastructure/persistence/typeorm/entities/cart.schema";
import { CustomerSchema } from "../../../../../customer/infrastructure/persistence/typeorm/entities/customer.schema";

@Entity('orders')
export class OrderTypeORM{
  @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'id', unsigned: true})
  public id:number;

  @Column('varchar',{name:'status'})
  public status:string;

  @Column('decimal',{name:'price'})
  public price:number;

  @Column('varchar',{name:'purchase_date'})
  public purchaseDate:string;

  @ManyToOne(()=>CartSchema,(cart)=>cart.order)
  @JoinColumn({name:'cart_id'})
  public Cart:CartSchema;

  @ManyToOne(()=>CustomerSchema,(customer)=>customer.orders)
  @JoinColumn({name:'customer_id'})
  public customer:CustomerSchema;
}
