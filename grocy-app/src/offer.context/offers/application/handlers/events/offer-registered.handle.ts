import { EventsHandler } from "@nestjs/cqrs/dist/utils/events-handler.decorator";
import { OfferRegisteredEvents } from "../../../messages/events/offer-registered.events";
import { IEventHandler } from "@nestjs/cqrs";

@EventsHandler(OfferRegisteredEvents)
export class OfferRegisteredHandler implements IEventHandler<OfferRegisteredEvents>{
    constructor() {}

    handle(event: OfferRegisteredEvents){
        console.log('handle logic for order registered event');
        console.log(event);
    }
}
