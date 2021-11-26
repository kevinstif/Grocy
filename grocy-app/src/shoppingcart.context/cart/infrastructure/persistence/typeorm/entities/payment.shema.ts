import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

import { Money } from "../../../../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../../../../common/domain/value-objects/date-time.value";

@Entity('payment')
export class PaymentSchema{

  @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'id', unsigned: true})
  public id:number;

  @Column('int',{name:'customerId'})
  public customerId:number;

  @Column('int',{name:'cartId'})
  public cartId:number;

  @Column('number',{name:'price'})
  public price:Money;

  @Column('date',{name:'date'})
  public date:DateTime;

  //Relationships
}
