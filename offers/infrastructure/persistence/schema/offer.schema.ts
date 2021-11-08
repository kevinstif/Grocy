import { EntitySchema } from "typeorm";
import { Offer } from "../../../domain/entity/offer";


export const OfferSchema =new EntitySchema({
    name:'Offer',
    target:Offer,
    tableName:'Offer',
    columns:{
        id:{
            type: 'bigint',
            primary: true,
            generated: true,
            unsigned: true,
        },
        discountPrice:{
            name:'DiscountPrice',
            type:Number,
        },
        dueDate:{
            name:'DueDate',
            type:String,
            length: 30,
        }
    }

})