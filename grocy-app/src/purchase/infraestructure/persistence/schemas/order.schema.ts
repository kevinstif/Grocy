import { EntitySchema } from "typeorm";
import { Order } from "../../../domain/entities/order";


export const OrderSchema =new EntitySchema({
  name:'Order',
  target:Order,
  tableName:'Order',
  columns:{
    id:{
      type: 'bigint',
      primary: true,
      generated: true,
      unsigned: true,
    },
    status:{
      name:'status',
      type:String,
      length:10
    },
    price:{
      name:'price',
      type:Number,
    },
    purchaseDate:{
      name:'purchase_date',
      type:String,
      length: 30,
    }
  }


})
