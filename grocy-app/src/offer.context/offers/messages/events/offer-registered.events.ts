import {Money} from "../../../../common/domain/value-objects/money.value";
import {DateTime} from "../../../../common/domain/value-objects/date-time.value";
import {Status} from "../../../../common/domain/Enum/Status";

export class OfferRegisteredEvents{
    constructor(
        public readonly id: number,
        public readonly discountPrice: Money,
        public readonly dueDate: DateTime,
        public readonly State: Status,

    ) {}
}
