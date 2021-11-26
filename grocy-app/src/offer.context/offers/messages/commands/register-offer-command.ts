import {Money} from "../../../../common/domain/value-objects/money.value";
import {DateTime} from "../../../../common/domain/value-objects/date-time.value";

export class RegisterOfferCommand{
    constructor(
        public readonly discountPrice:number,
        public readonly dueDate:DateTime,
        public readonly state:string,
    ) {}
}
