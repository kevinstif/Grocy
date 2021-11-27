import {CartState} from "../abstract/cart-state";

export class PendingCart extends CartState {
    public handle(): void {
        console.log('Pending state Cart handles request');
        console.log('The Pending state will change the state of the context');
    }
}