import {Cart} from "./cart";
import {PendingCart} from "./concrete/pending-cart";
import {CompletedCart} from "./concrete/completed-cart";

export class Client {
    public execute(): void {
        let cart = new Cart(new CompletedCart());
        cart.request();
        cart.transitionTo(new PendingCart());
    }
}

const client: Client = new Client();
client.execute();