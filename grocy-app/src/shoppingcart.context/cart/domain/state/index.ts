import {Cart} from "./cart";
import {PendingCart} from "./concrete/pending-cart";
import {CompletedCart} from "./concrete/completed-cart";

export class Client {
    public execute(): void {
        let cart = new Cart(new PendingCart());
        cart.request();
        cart.transitionTo(new CompletedCart());
    }
}

const client: Client = new Client();
client.execute();
