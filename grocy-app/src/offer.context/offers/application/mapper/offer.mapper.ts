import { Offer } from "../../domain/entity/offer";
import { OfferTypeORM } from "../../infrastructure/persistence/typeorm/entities/offerTypeORM";
import { PriceTypeORM } from "../../../../common/infrastructure/persistence/typeorm/value-objects/PriceTypeORM";

export class OfferMapper{
  public static toTypeORM(offer:Offer):OfferTypeORM{
    const offerTypeORM:OfferTypeORM=new OfferTypeORM();

    offerTypeORM.state=offer.GetState();
    offerTypeORM.discountPrice=PriceTypeORM.from(offer.GetPriceDiscount().getAmount(),offer.GetPriceDiscount().getCurrency());
    offerTypeORM.dueDate=offer.GetDueDate().getDate().toString();

    return offerTypeORM;
  }
}
