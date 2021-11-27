import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OfferTypeORM } from "../../infrastructure/persistence/typeorm/entities/offerTypeORM";
import { Repository } from "typeorm";
import { Offer } from "../../domain/entity/offer";
import { registerOffersRequestDto } from "../dtos/request/register-offers-request.dto";
import { AppNotification } from "../../../../common/application/app.notification";
import { Money } from "../../../../common/domain/value-objects/money.value";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";


@Injectable()
export class RegisterOfferValidator{
    constructor(@InjectRepository(OfferTypeORM) private offerRepository:Repository<Offer>) {}

    public async validate(registerOffersRequestDto:registerOffersRequestDto):Promise<AppNotification>{
        let notification: AppNotification = new AppNotification();
        const discountPrice: number = registerOffersRequestDto.discountPrice ? registerOffersRequestDto.discountPrice:0;
        if (discountPrice <= 0){
            notification.addError('Offer discount price is required', null);
        }
        const state: string = registerOffersRequestDto.state ? registerOffersRequestDto.state.trim():'';

        if (state.length <= 0) {
            notification.addError('Offer state is required', null);
        } else if (state!= 'Done' && state!='Cancel') {
            notification.addError('Order status is invalid use Done || Cancel', null);
        }
        if (notification.hasErrors()) {
            return notification;
        }
        return notification;

    }

}
// accept
