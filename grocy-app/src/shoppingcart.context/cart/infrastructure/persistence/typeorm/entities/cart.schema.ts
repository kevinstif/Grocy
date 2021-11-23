import { Column, Entity, EntitySchema, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderTypeORM } from "../../../../../../purchase/order/infrastructure/persistence/typeorm/entities/orderTypeORM";
import { ProductTypeORM } from "../../../../../../purchase/product/infrastructure/persistence/typeorm/entities/productTypeORM";

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

  @ManyToOne(()=>OrderTypeORM,(order)=>order.Cart)
  @JoinColumn({name:'order_id'})
  public order:OrderTypeORM

  @ManyToMany(()=>ProductTypeORM,(product)=>product.carts)
  public products:ProductTypeORM[];
}
