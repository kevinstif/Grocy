import { Entity } from "../../../../common/domain/entities/entity";
import { OrderRegisteredEvents } from "../../messages/events/order-registered.events";
import { Cart } from "../../../../shoppingcart.context/cart/domain/entities/cart";

export class Order extends Entity {
  private Price:number;
  private PurchaseDate:string;
  private Status:string;
  private cart:Cart;
  private cartId:number;

  public constructor(id:number,price:number,purchaseDate:string,status:string) {
    super(id);
    this.Price=price;
    this.PurchaseDate=purchaseDate;
    this.Status=status;
  }
  public register(){
    const event=new OrderRegisteredEvents(this.id,this.Price,this.PurchaseDate,this.Status);
    this.apply(event);
  }

  public GetPrice():number{
    return this.Price;
  }
  public GetPurchaseDate():string{
    return this.PurchaseDate;
  }
  public GetStatus():string{
    return this.Status;
  }

  public changePrice(price:number):void{
    this.Price=price;
  }
  public changePurchaseDate(purchaseDate:string):void{
    this.PurchaseDate=purchaseDate;
  }
  public changeStatus(status:string):void{
    this.Status=status;
  }
}
