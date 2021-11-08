import { Money } from "../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";
import { Status } from "../../../common/domain/Enum/Status";
import { Id } from "../../../common/domain/value-objects/id.value";
import { Offer } from "../entity/offer";

export class OfferFactory{
    public static createFrom(discountPrice:Money,dueDate:DateTime,state:Status):Offer{
        return new Offer(0,discountPrice,dueDate,state)
    }

    public static withId(discountPrice:Money,dueDate:DateTime,state:Status,id:number):Offer{
        return new Offer(id,discountPrice,dueDate,state)
    }
}