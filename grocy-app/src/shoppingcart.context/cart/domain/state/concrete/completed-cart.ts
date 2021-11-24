import {CartState} from "../abstract/cart-state";

export class CompletedCart extends CartState {
    public handle(): void {
        console.log('Completed state handles request');
        console.log('The Completed state will change the state of the context');
    }
}