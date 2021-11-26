import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

import { PriceTypeORM } from "../../../../../../common/infrastructure/persistence/typeorm/value-objects/PriceTypeORM";

@Entity('payment')
export class PaymentSchema{

  @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'id', unsigned: true})
  public id:number;

  @Column('int',{name:'customerId'})
  public customerId:number;

  @Column('int',{name:'cartId'})
  public cartId:number;

  @Column(()=>PriceTypeORM,{prefix:false})
  public price:PriceTypeORM;

  @Column('datetime',{name:'date'})
  public date:string;

}
