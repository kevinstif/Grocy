
import {OfferRegisteredEvents} from "../../messages/events/offer-registered.events";
import {Entity} from "../../../../common/domain/entities/entity";
import {Money} from "../../../../common/domain/value-objects/money.value";
import {DateTime} from "../../../../common/domain/value-objects/date-time.value";
import {Status} from "../../../../common/domain/Enum/Status";

export class Offer extends Entity{
    private DiscountPrice:Money;
    private DueDate:DateTime;
    private State:Status;

    public constructor(id:number,priceDiscount:Money,dueDate:DateTime,state:Status) {
        super(id);
        this.DiscountPrice=priceDiscount;
        this.DueDate=dueDate;
        this.State=state;
    }
    public register(){
        const event=new OfferRegisteredEvents(this.id,this.DiscountPrice,this.DueDate,this.State);
        this.apply(event);
    }
    public GetPriceDiscount():Money{
        return this.DiscountPrice;
    }
    public GetDueDate():DateTime{
        return this.DueDate;
    }
    public GetState():Status{
        return this.State;
    }
    public changePriceDiscount(price:Money):void{
        this.DiscountPrice=price;
    }
    public changeDueDate(dueDate:DateTime):void{
        this.DueDate=dueDate;
    }
    public changeState(state:Status):void{
        this.State=state;
    }

}
