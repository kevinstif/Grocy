import { Money } from "../../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";
import { Id } from "../../../../common/domain/value-objects/id.value";
import { Status } from "../../../../common/domain/enum/status";

export class registerOffersResponseDto{
    public constructor(
        public id:Id,
        public readonly price:Money,
        public readonly purchaseDate:DateTime,
        public state:Status,
    ) {}
}
