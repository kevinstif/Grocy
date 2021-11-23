import { EntitySchema } from "typeorm";
import { Customer } from "../../../../domain/entities/customer";

export const CustomerSchema =new EntitySchema({
  name:'Customer',
  target:Customer,
  tableName:'customers',
  columns:{
    id:{
      type: 'bigint',
      primary: true,
      generated: true,
      unsigned: true,
    },
    firstName:{
      name:'first_name',
      type:String,
      length:30
    },
    lastName:{
      name:'last_name',
      type:String,
      length: 30,
    },
    phone:{
      name:'phone',
      type:String,
      length: 9,
    },
    address:{
      name:'address',
      type:String,
      length: 30,
    }
  }
})
