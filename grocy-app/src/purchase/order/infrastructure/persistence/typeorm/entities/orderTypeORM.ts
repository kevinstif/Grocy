import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Cart } from "../../../../../../shoppingcart.context/cart/domain/entities/cart";
import { CartSchema } from "../../../../../../shoppingcart.context/cart/infrastructure/persistence/typeorm/entities/cart.schema";

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

  @OneToMany(()=>CartSchema,(cart)=>cart.order)
  public Cart:CartSchema[];
}
