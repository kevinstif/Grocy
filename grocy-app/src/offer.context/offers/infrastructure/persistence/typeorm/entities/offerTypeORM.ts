import { Column, Entity, EntitySchema, PrimaryGeneratedColumn } from "typeorm";
import { PriceTypeORM } from "../../../../../../common/infrastructure/persistence/typeorm/value-objects/PriceTypeORM";
import { Status } from "../../../../../../common/domain/Enum/Status";

@Entity('offers')
export class OfferTypeORM {
  @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'id', unsigned: true})
  public id:number;

  @Column(()=>PriceTypeORM,{prefix:false})
  public discountPrice:PriceTypeORM

  @Column('datetime',{name:'due_date'})
  public dueDate:string;

  @Column({name:'status',type:'enum',enum:Status,default:Status.Done})
  public state:Status
}
