import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
