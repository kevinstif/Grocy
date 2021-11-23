import {Money} from "../../../../common/domain/value-objects/money.value";
import {DateTime} from "../../../../common/domain/value-objects/date-time.value";
import {Status} from "../../../../common/domain/Enum/Status";

export class RegisterOfferCommand{
    constructor(
        public readonly discountPrice:Money,
        public readonly dueDate:DateTime,
        public readonly state:Status,
    ) {}
}
