import { EntitySchema } from "typeorm";
import { Cart } from "../../../../domain/entities/cart";

export const CartSchema =new EntitySchema({
  name:'Cart',
  target:Cart,
  tableName:'shoppingCarts',
  columns:{
    id:{
      type: 'bigint',
      primary: true,
      generated: true,
      unsigned: true,
    },
    state:{
      name:'state',
      type:String,
      length:10
    },
    customerId:{
      name:'customerId',
      type:Number,
    },
    productId:{
      name:'productId',
      type:Number,
    },
    quantity:{
      name:'quantity',
      type:Number,
    },
    creationDate:{
      name:'creation_date',
      type:String,
      length: 30,
    }
  }
})
