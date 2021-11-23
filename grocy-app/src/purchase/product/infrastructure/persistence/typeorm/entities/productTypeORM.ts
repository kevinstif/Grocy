import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartSchema } from "../../../../../../shoppingcart.context/cart/infrastructure/persistence/typeorm/entities/cart.schema";
import { SupplierTypeorm } from "../../../../../../offer.context/suppliers/infrastructure/persistence/typeorm/entities/supplier.typeorm";

@Entity('products')
export class ProductTypeORM{
  @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'id', unsigned: true})
  public id:number;

  @Column('varchar',{name:'name'})
  public name:string;

  @Column('varchar',{name:'type'})
  public type:string;

  @Column('int',{name:'price'})
  public price:number;

  @Column('int',{name:'stock'})
  public stock:number;

  @ManyToMany(()=>CartSchema,(cart)=>cart.products)
  @JoinTable(
    {
     name:'product_cart',
     joinColumn:{
       name:'product_id'
     },
      inverseJoinColumn:{
       name:'cart_id'
      }
    }
  )
  public carts:CartSchema[];

  @ManyToMany(()=>SupplierTypeorm,(suppliers)=>suppliers.products)
  public suppliers:SupplierTypeorm[];
}
