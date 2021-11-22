import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
}
