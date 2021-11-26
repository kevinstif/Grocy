import { PaymentCartRequestDto } from "../dtos/request/payment-cart-request.dto";
import { AppNotification } from "../../../../common/application/app.notification";

export class PaymentCartValidator{
  constructor() {}

  public async validate(paymentCartRequest:PaymentCartRequestDto):Promise<AppNotification>{

    let appNotification:AppNotification=new AppNotification();

    let cardId:number=paymentCartRequest.cartId ? paymentCartRequest.cartId:0;
    let customerId:number=paymentCartRequest.customerId ? paymentCartRequest.customerId:0;

    if (cardId<=0){
      appNotification.addError("cardId is required", null);
    }

    if(customerId<=0){
      appNotification.addError("customerID is required",null);
    }

    if (appNotification.hasErrors()){
      return appNotification;
    }

    return appNotification;

  }

}
