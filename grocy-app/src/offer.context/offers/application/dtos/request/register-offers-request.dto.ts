import {Money} from "../../../../../common/domain/value-objects/money.value";
import {DateTime} from "../../../../../common/domain/value-objects/date-time.value";


export class registerOffersRequestDto{
    public constructor(
        public readonly discountPrice:number,
        public readonly dueDate:string,
        public state:string,
    ) {}
}
