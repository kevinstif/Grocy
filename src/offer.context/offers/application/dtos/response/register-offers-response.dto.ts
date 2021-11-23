import {Id} from "../../../../../common/domain/value-objects/id.value";
import {Money} from "../../../../../common/domain/value-objects/money.value";
import {DateTime} from "../../../../../common/domain/value-objects/date-time.value";
import {Status} from "../../../../../common/domain/Enum/Status";


export class registerOffersResponseDto{
    public constructor(
        public id:Id,
        public readonly price:Money,
        public readonly purchaseDate:DateTime,
        public state:Status,
    ) {}
}
