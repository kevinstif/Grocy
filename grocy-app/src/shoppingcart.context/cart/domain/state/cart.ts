import { CartState } from "./abstract/cart-state";

export class Cart {
    private state: CartState;

    constructor(state: CartState) {
        this.transitionTo(state);
    }

    public transitionTo(state: CartState): void {
        console.log(`Context: Change state to ${(<any>state).constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }

    public request(): void {
        this.state.handle();
    }
}