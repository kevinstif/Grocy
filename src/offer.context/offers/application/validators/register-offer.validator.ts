import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OfferSchema } from "../../infrastructure/persistence/schema/offer.schema";
import { Repository } from "typeorm";
import { Offer } from "../../domain/entity/offer";
import { registerOffersRequestDto } from "../dtos/request/register-offers-request.dto";
import { AppNotification } from "../../../../common/application/app.notification";
import { Money } from "../../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";


@Injectable()
export class RegisterOfferValidator{
    constructor(@InjectRepository(OfferSchema) private offerRepository:Repository<Offer>) {}

    public async validate(registerOffersRequestDto:registerOffersRequestDto):Promise<AppNotification>{
        let notification: AppNotification = new AppNotification();
        const discountPrice: Money = registerOffersRequestDto.discountPrice;
        if (discountPrice.getAmount() <= 0) {
            notification.addError('Offer discount price is required', null);
        }
        const dueDate: DateTime = registerOffersRequestDto.dueDate;
        const DueDate:string=dueDate.getDate().toString().trim();
        if (DueDate.length <= 0) {
            notification.addError('Offer dueDate is required', null);
        }
        if (notification.hasErrors()) {
            return notification;
        }
        return notification;

    }

}
// accept
