import {Cart} from "../cart";

export abstract class CartState {
    protected cart: Cart;

    public setContext(cart: Cart) {
        this.cart = cart;
    }

    public abstract handle(): void;
}