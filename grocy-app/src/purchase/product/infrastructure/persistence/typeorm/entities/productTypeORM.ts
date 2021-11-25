import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { SupplierTypeorm } from "../../../../../../offer.context/suppliers/infrastructure/persistence/typeorm/entities/supplier.typeorm";
import { TypeProduct } from "../../../../domain/enums/type-product";
import { PriceTypeORM } from "../../../../../../common/infrastructure/persistence/typeorm/value-objects/PriceTypeORM";
import { CartSchema } from "../../../../../../shoppingcart.context/cart/infrastructure/persistence/typeorm/entities/cart.schema";

@Entity('products')
export class ProductTypeORM{
  @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'id', unsigned: true})
  public id:number;

  @Column('varchar',{name:'name'})
  public name:string;

  @Column({name:'type',type:'enum',enum:TypeProduct,default:TypeProduct.package})
  public type:TypeProduct;

  @Column(()=>PriceTypeORM,{prefix:false})
  public price:PriceTypeORM;

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
